import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useUser } from './UserContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  discount?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user, loading } = useUser();

  const persistItems = async (items: CartItem[]) => {
    if (!user) return;
    try {
      await setDoc(
        doc(db, 'carts', user.uid),
        { items, updatedAt: serverTimestamp() },
        { merge: true }
      );
    } catch (error) {
      console.error('Error persisting cart items:', error);
    }
  };

  useEffect(() => {
    if (loading) return;
    let unsubscribe: (() => void) | undefined;
    if (user) {
      unsubscribe = onSnapshot(doc(db, 'carts', user.uid), (snap) => {
        const data = snap.data() as { items?: CartItem[] } | undefined;
        setCartItems(data?.items ?? []);
      });
    } else {
      setCartItems([]);
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user, loading]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    if (!user) {
      // Redirect to login page when trying to add to cart while logged out
      window.location.href = '/auth/login';
      return;
    }
    
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      const nextItems = existingItem
        ? prev.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prev, { ...item, quantity: 1 }];
      if (user) void persistItems(nextItems);
      return nextItems;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => {
      const nextItems = prev.filter(item => item.id !== id);
      if (user) void persistItems(nextItems);
      return nextItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => {
      const nextItems = prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      if (user) void persistItems(nextItems);
      return nextItems;
    });
  };

  const clearCart = () => {
    setCartItems(() => {
      const nextItems: CartItem[] = [];
      if (user) void persistItems(nextItems);
      return nextItems;
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const discount = item.discount ? parseFloat(item.discount) : 0;
      const discountedPrice = item.price - (item.price * discount / 100);
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
