import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [activitiesCount, setActivitiesCount] = useState(0);
  const [friendshipsCount, setFriendshipsCount] = useState(0);
  const [activitiesThisMonth, setActivitiesThisMonth] = useState(0);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<any[]>([]);

  // Generate calendar days for current month
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get previous month days to fill first week
    const firstDayOfWeek = firstDay.getDay();
    const prevMonthDays = [];
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      prevMonthDays.push({
        date: day.getDate(),
        month: 'prev',
        current: false,
      });
    }
    
    // Current month days
    const currentMonthDays = [];
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      currentMonthDays.push({
        date: i,
        month: 'current',
        current: today.getDate() === i && 
                today.getMonth() === month && 
                today.getFullYear() === year,
      });
    }
    
    // Next month days to fill last week
    const totalDays = prevMonthDays.length + currentMonthDays.length;
    const remainingDays = 42 - totalDays;
    const nextMonthDays = [];
    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push({
        date: i,
        month: 'next',
        current: false,
      });
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  useEffect(() => {
    setCalendarDays(generateCalendarDays(currentMonth));
  }, [currentMonth]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data
        setUserCount(120);
        setActivitiesCount(85);
        setFriendshipsCount(40);
        setActivitiesThisMonth(12);
        
        setRecentActivities([
          {
            id: 1,
            title: 'Paseo al parque',
            status: 'completed',
            location: 'Parque Kennedy',
            date: '2025-04-15',
            createdAt: '2025-04-10'
          },
          {
            id: 2,
            title: 'Reunión mensual',
            status: 'scheduled',
            location: 'Sede central',
            date: '2025-04-25',
            createdAt: '2025-04-05'
          },
          {
            id: 3,
            title: 'Taller de arte',
            status: 'scheduled',
            location: 'Centro cultural',
            date: '2025-04-28',
            createdAt: '2025-04-01'
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get today's date in Spanish format
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('es-ES', options);
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  // Weekday names in Spanish
  const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Panel principal</h1>
      </div>
      
      {/* Welcome Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold">Bienvenido, Alexia</h2>
        <p className="text-gray-600">Hoy es {capitalizedDate}. Tiene 3 notificaciones pendientes.</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total Activities */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Total de Actividades</h3>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">{activitiesCount}</p>
                      <p className="ml-2 text-sm font-medium text-green-600">82% <span className="text-gray-500">vs mes anterior</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Total Peerbuddies */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-lg p-3">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Total Peerbuddies</h3>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">{userCount}</p>
                      <p className="ml-2 text-sm font-medium text-green-600">90% <span className="text-gray-500">vs mes anterior</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Active Friendships */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Amistades activas</h3>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">{friendshipsCount}</p>
                      <p className="ml-2 text-sm font-medium text-green-600">90% <span className="text-gray-500">vs mes anterior</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Activities This Month */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Actividades este mes</h3>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">{activitiesThisMonth}</p>
                      <p className="ml-2 text-sm font-medium text-green-600">5% <span className="text-gray-500">vs mes anterior</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">Calendario de Actividades</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <button 
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-2 py-1 text-sm rounded hover:bg-gray-100"
                >
                  Hoy
                </button>
                <button 
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium text-gray-900">
                  {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </h3>
              </div>
              
              {/* Days of week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekdays.map((day, index) => (
                  <div key={index} className="text-sm font-medium text-gray-500 text-center py-2">
                    {day.substring(0, 3)}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div 
                    key={index}
                    className={`
                      h-10 rounded-lg flex items-center justify-center text-sm
                      ${day.month === 'current' 
                        ? 'text-gray-900' 
                        : 'text-gray-400'
                      }
                      ${day.current 
                        ? 'bg-blue-600 text-white font-semibold' 
                        : day.month === 'current' 
                          ? 'hover:bg-gray-100' 
                          : ''
                      }
                    `}
                  >
                    {day.date}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">Actividades Recientes</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
                  <div key={activity.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-blue-600">{activity.title}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                        ${activity.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        activity.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                        {activity.status === 'completed' ? 'Completada' : 
                         activity.status === 'cancelled' ? 'Cancelada' : 'Programada'}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {activity.location}
                      <span className="mx-2">•</span>
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {new Date(activity.date).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No hay actividades recientes
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardPage;