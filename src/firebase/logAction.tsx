import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Logs a user action to Firestore
 * @param userId - Firebase UID of the user
 * @param action - Description of the action
 */
export async function logAction(userId: string, action: string): Promise<void> {
  try {
    await addDoc(collection(db, "logs"), {
      userId,
      action,
      timestamp: serverTimestamp(),
    });
    console.log("Logged action:", action);
  } catch (error) {
    console.error("Error logging action:", error);
  }
}
