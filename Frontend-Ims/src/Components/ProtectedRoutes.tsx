// import { Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

 
// interface ProtectedRouteProps {
//   element: JSX.Element;
//   allowedRoles?: string[];
// }

// interface User {
//   role: string;
   
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {
//   const { user } = useAuth() as { user: User | null };

//   if (!user) {
//     return <Navigate to="/signin" />; // Redirect if not logged in
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/" />; // Redirect if role not allowed
//   }

//   return element;
// };

// export default ProtectedRoute;
