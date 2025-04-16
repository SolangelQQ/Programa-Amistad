import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './presentation/components/layout/MainLayout';
import LoginPage from './presentation/pages/auth/LoginPage';
import DashboardPage from './presentation/pages/dashboard/DashboardPage';
import { ReactNode } from 'react';
import './tailwind.css'

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = true; // Cambia esto por tu lógica real de autenticación
  return auth ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}


export default App;



// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import MainLayout from './presentation/components/layout/MainLayout';
// import LoginPage from './presentation/pages/auth/LoginPage';
// import RegisterPage from './presentation/pages/auth/RegisterPage';
// import DashboardPage from './presentation/pages/dashboard/DashboardPage';
// import UserList from './presentation/pages/user/UserList';
// import UserProfile from './presentation/pages/user/UserProfile';

// import { ReactNode } from 'react';
// import './tailwind.css';

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const auth = true; // Cambia esto por tu lógica real de autenticación
//   return auth ? <>{children}</> : <Navigate to="/login" />;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Rutas públicas */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />


//         {/* Rutas protegidas */}
//         <Route path="/" element={
//           <ProtectedRoute>
//             <MainLayout />
//           </ProtectedRoute>
//         }>
//           <Route index element={<DashboardPage />} />
//           <Route path="users" element={<UserList />} />
//           <Route path="users/:id" element={<UserProfile />} />
//         </Route>
        
//         {/* Ruta 404 */}
//         <Route path="*" element={<div>404 Not Found</div>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;