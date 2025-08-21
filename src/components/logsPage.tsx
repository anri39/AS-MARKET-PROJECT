import "./LogsPage.css";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer";
import { useUser } from "../context/UserContext.tsx";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase.ts";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

interface Log {
  id: string;
  action: string;
  timestamp: any;
  userId: string;
}

function LogsPage() {
  const { user, loading } = useUser();
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "logs"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logsData: Log[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Log, "id">),
      }));
      setLogs(logsData);
    });
    return () => unsubscribe();
  }, [user]);

  if (loading) return null;
  if (!user) return <Navigate to="/auth/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return (
    <>
      <Navbar />
      <div className="logs-page-container">
        <h1>Activity Logs</h1>
        <div className="logs-table-container">
          <table className="logs-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>User ID</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.action}</td>
                  <td>{log.userId}</td>
                  <td>
                    {log.timestamp?.toDate
                      ? log.timestamp.toDate().toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LogsPage;
