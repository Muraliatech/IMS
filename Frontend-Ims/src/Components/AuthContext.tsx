// import { createContext, useContext, useState, useEffect } from "react";

// // Create Auth Context
// const AuthContext = createContext({
//   user: null,
//   login: (userData: any) => {},
//   logout: () => {}
// });

// // AuthProvider Component
// import { ReactNode } from "react";

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState(null);

//   // Check if user is logged in (on page refresh)
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null;
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   // Login function
// const login = (userData: User) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
// };

//   // Logout function
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook to use AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
