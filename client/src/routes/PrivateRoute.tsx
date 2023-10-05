import { ReactNode } from "react";
import { Navigate  } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface PrivateRouteProps {
  children: ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  if (!isAuth) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
}
