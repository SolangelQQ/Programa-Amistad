// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import MainLayout from './presentation/components/layout/MainLayout';
// import LoginPage from './presentation/pages/auth/LoginPage';
// import DashboardPage from './presentation/pages/dashboard/DashboardPage';
// import { ReactNode } from 'react';
// import { AuthProvider, useAuth } from './presentation/hooks/useAuth';
// import './tailwind.css';

// // Protected route component that uses the auth hook
// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const { isAuthenticated, loading } = useAuth();
  
//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   }
  
//   return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
// };

// // App Routes component - needs to be inside the Router
// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/" element={<Navigate to="/login" replace />} />
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <MainLayout>
//               <DashboardPage />
//             </MainLayout>
//           </ProtectedRoute>
//         }
//       />
//       <Route path="*" element={<h1>404 Not Found</h1>} />
//     </Routes>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <AppRoutes />
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;