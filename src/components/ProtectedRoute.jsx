import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores";

export default function ProtectedRoute({ children }) {
  const userToken = useUserStore((state) => state.userToken);

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  return children;
}
