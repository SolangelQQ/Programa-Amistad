import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

interface MainLayoutProps {
    children: React.ReactNode;
  }

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;


// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from './Navbar';

// // Eliminamos la prop children ya que usaremos Outlet
// const MainLayout: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <main className="py-6">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MainLayout;


