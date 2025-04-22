// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useState, useEffect, createContext, useContext } from 'react';
// import { authService } from './core/application/auth.service';
// import { User } from './core/domain/user.model';
// import './tailwind.css';

// // Pages
// import LoginPage from './presentation/pages/auth/LoginPage';
// import RegisterPage from './presentation/pages/auth/RegisterPage';
// import DashboardPage from './presentation/pages/dashboard/DashboardPage';
// import UserList from './presentation/pages/user/UserList';
// import UserProfile from './presentation/pages/user/UserProfile';
// import RoleManagementPage from './presentation/pages/admin/RoleManagementPage';
// import UserRoleAssignmentPage from './presentation/pages/admin/UserRoleAssignmentPage';
// import MainLayout from './presentation/components/layout/MainLayout';

// // Auth Context Types
// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   isAuthenticated: boolean;
//   setUser: (user: User | null) => void;
//   logout: () => Promise<void>;
// }

// // Auth Context
// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   isAuthenticated: false,
//   setUser: () => {},
//   logout: async () => {}
// });

// export const useAuthContext = () => useContext(AuthContext);

// function App() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       try {
//         console.log("⚡ Verificando autenticación...");
//         if (authService.isAuthenticated()) {
//           const currentUser = authService.getCurrentUser();
//           console.log("🧠 Usuario desde localStorage:", currentUser);
  
//           if (currentUser) {
//             setUser(currentUser);
//             console.log("👥 Usuario cargado desde localStorage:", currentUser);
//           } else {
//             console.log("⚠️ Token existe pero no hay usuario, realizando logout");
//             await authService.logout();
//           }
//         } else {
//           console.log("🔒 No hay sesión activa");
//         }
//       } catch (error) {
//         console.error("❌ Error verificando autenticación:", error);
//         await authService.logout();
//       } finally {
//         setLoading(false);
//         console.log("✅ Verificación de autenticación completada");
//       }
//     };
  
//     checkAuthentication();
//   }, []);

//   const logout = async () => {
//     console.log("🚪 Cerrando sesión...");
//     await authService.logout();
//     setUser(null);
//     console.log("👋 Sesión cerrada");
//   };

//   const authContextValue: AuthContextType = {
//     user,
//     loading,
//     isAuthenticated: !!user,
//     setUser,
//     logout
//   };

//   return (
//     <AuthContext.Provider value={authContextValue}>
//       <Router>
//         <Routes>
//           {/* Ruta raíz - Redirige según autenticación */}
//           <Route 
//             path="/" 
//             element={!!user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
//           />

//           {/* Rutas públicas */}
//           <Route 
//             path="/login"  
//             element={!!user ? <Navigate to="/dashboard" /> : <LoginPage />}
//           />
          
//           <Route 
//             path="/register" 
//             element={!!user ? <Navigate to="/dashboard" /> : <RegisterPage />}
//           />
          
//           {/* Rutas protegidas */}
//           <Route element={<MainLayout title="Dashboard"> <DashboardPage /> </MainLayout>}>
//             <Route path="/dashboard" element={<DashboardPage />} />
//           </Route>

//           <Route element={<MainLayout title="Usuarios"> <UserList /> </MainLayout>}>
//             <Route path="/user" element={<UserList />} />
//             <Route path="/user/profile/:id" element={<UserProfile />} />
//           </Route>

//           <Route element={<MainLayout title="Gestión de Roles"> <RoleManagementPage /> </MainLayout>}>
//             <Route path="/admin/role-management" element={<RoleManagementPage />} />
//           </Route>

//           <Route element={<MainLayout title="Asignación de Roles"> <UserRoleAssignmentPage /> </MainLayout>}>
//             <Route path="/admin/user-role-assignment" element={<UserRoleAssignmentPage />} />
//           </Route>

//           {/* Ruta 404 */}
//           <Route 
//             path="*" 
//             element={
//               <MainLayout title="Página no encontrada">
//                 <div className="flex h-full items-center justify-center">
//                   <div className="rounded-lg bg-white p-8 shadow-xl">
//                     <h1 className="mb-4 text-3xl font-bold text-indigo-600">404</h1>
//                     <p className="mb-6 text-gray-600">La página que buscas no existe.</p>
//                     <a 
//                       href={!!user ? "/dashboard" : "/login"}
//                       className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
//                     >
//                       Volver al inicio
//                     </a>
//                   </div>
//                 </div>
//               </MainLayout>
//             } 
//           />
//         </Routes>
//       </Router>
//     </AuthContext.Provider>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import MainLayout from './presentation/components/layout/MainLayout';
import LoginPage from './presentation/pages/auth/LoginPage';
import RegisterPage from './presentation/pages/auth/RegisterPage';
import DashboardPage from './presentation/pages/dashboard/DashboardPage';
import { authService } from './core/application/auth.service';
import { User } from './core/domain/user.model';
import './tailwind.css';
import RoleManagementPage from './presentation/pages/admin/RoleManagementPage';

// =====================
// Auth Context Types
// =====================
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

// =====================
// Auth Context
// =====================
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  setUser: () => {},
  logout: async () => {}
});

export const useAuthContext = () => useContext(AuthContext);

// =====================
// App Component
// =====================
function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Inicializar el contexto desde localStorage al cargar
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        console.log("⚡ Verificando autenticación...");
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          console.log("🧠 Usuario desde localStorage:", currentUser);
  
          if (currentUser) {
            setUser(currentUser);
            console.log("👥 Usuario cargado desde localStorage:", currentUser);
          } else {
            // Si el token existe pero no hay usuario, limpiamos por seguridad
            console.log("⚠️ Token existe pero no hay usuario, realizando logout");
            await authService.logout();
          }
        } else {
          console.log("🔒 No hay sesión activa");
        }
      } catch (error) {
        console.error("❌ Error verificando autenticación:", error);
        await authService.logout();
      } finally {
        setLoading(false);
        console.log("✅ Verificación de autenticación completada");
      }
    };
  
    checkAuthentication();
  }, []);

  const logout = async () => {
    console.log("🚪 Cerrando sesión...");
    await authService.logout();
    setUser(null);
    console.log("👋 Sesión cerrada");
  };

  const authContextValue: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    setUser,
    logout
  };

  // Lo que vamos a hacer es simplificar la estructura de rutas y mejorar los logs
  console.log("🔄 Renderizando App con estado de autenticación:", !!user);

  return (
    <AuthContext.Provider value={authContextValue}>
      
      <Router>
      <MainLayout title="">
        <Routes>
          {/* Ruta raíz - Redirige según autenticación */}
          <Route 
            path="/" 
            element={!!user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
          />

          {/* Rutas públicas - Solo accesibles si NO está autenticado */}
          <Route 
            path="/login"  
            element={!!user ? <Navigate to="/dashboard" /> : <LoginPage />}
          />
          
          <Route 
            path="/register" 
            element={!!user ? <Navigate to="/dashboard" /> : <RegisterPage />}
          />
          
          {/* Rutas protegidas - Solo accesibles si está autenticado */}
          <Route
            path="/dashboard/*"
            element={!!user ? <DashboardPage /> : loading ? (
              <div className="flex h-screen w-full items-center justify-center bg-indigo-50">
                <div className="text-center">
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
                  <p className="text-lg text-gray-700">Cargando...</p>
                </div>
              </div>
            ) : <Navigate to="/login" />}
          />

          {/* <Route 
          path="/admin/role-management" 
          element={ <RoleManagementPage /> }>
            <Route path="/admin/role-management" element={<RoleManagementPage />} />
          </Route> */}

         <Route 
          path="/admin/role-management" 
          element={ <RoleManagementPage /> }/>
            {/* <Route path="/admin/role-management" element={<RoleManagementPage />} />
          </Route> */}

          {/* Ruta 404 */}
          <Route 
            path="*" 
            element={
              <div className="flex h-screen items-center justify-center bg-indigo-50">
                <div className="rounded-lg bg-white p-8 shadow-xl">
                  <h1 className="mb-4 text-3xl font-bold text-indigo-600">404</h1>
                  <p className="mb-6 text-gray-600">La página que buscas no existe.</p>
                  <a 
                    href={!!user ? "/dashboard" : "/login"}
                    className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
                  >
                    Volver al inicio
                  </a>
                </div>
              </div>
            } 
          />
        </Routes>
        </MainLayout>
      </Router>
      
    </AuthContext.Provider>
  );
}

export default App;