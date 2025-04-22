import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../core/application/auth.service';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useAuthContext } from '../../../App';// Ajusta el path si es necesario


interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  // const { setUser } = useAuthContext();
  const { setUser } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado para mostrar contraseña
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const user = await authService.login({ email, password });
      console.log('Usuario devuelto por login:', user);
      setUser(user); // ✅ Aquí se actualiza el contexto global
      navigate('/dashboard');
    } catch (err: unknown) {
      const error = err as ErrorResponse;
      console.error('Login error:', err);
      setError(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential;
      const user = await authService.loginWithGoogle(token);
      setUser(user); // ✅ También aquí
      navigate('/dashboard');
    } catch (error) {
      console.error('Error en login con Google:', error);
      setError('Error al iniciar sesión con Google');
    }
  };

  return (
    <GoogleOAuthProvider clientId="722105965023-gfb5s3nu6fplfug3oh9li381l7ol9nh3.apps.googleusercontent.com">
      <div className="flex min-h-screen items-center justify-center bg-indigo-50 p-4">
        <div className="w-full max-w-4xl animate-[fadeIn_0.6s_ease] overflow-hidden rounded-xl bg-white shadow-xl">
          <div className="flex">
            {/* Panel izquierdo (logo) - Se mantiene igual */}
            <div className="flex w-2/5 flex-col items-center justify-center bg-gradient-to-b from-indigo-600 to-indigo-800 px-8 py-16 text-center text-white">
              <div className="mb-8 w-4/5 max-w-[220px] rounded-xl bg-indigo-500 p-6 shadow-lg">
                <img
                  src="/logo.jpeg"
                  alt="Best Buddies Bolivia Logo"
                  className="h-auto w-full"
                />
              </div>
              <h1 className="mb-2 text-2xl font-bold">Bienvenido</h1>
              <h1 className="mb-2 text-2xl font-bold">Best Buddies Bolivia</h1>
              <p className="text-lg text-indigo-100">Programa Amistad</p>
            </div>

            {/* Panel derecho (formulario) */}
            <div className="w-3/5 bg-white px-10 py-12">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-3xl font-bold text-gray-800">Iniciar sesión</h2>
                <p className="text-gray-600">Ingresa tus datos para continuar</p>
              </div>

              {error && (
                <div className="mb-6 flex items-center rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="mr-3 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campo de email (se mantiene igual) */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="email">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="h-5 w-5">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 shadow-sm transition-all focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="tucorreo@ejemplo.com"
                    />
                  </div>
                </div>

                {/* Campo de contraseña con icono de ojo */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                      Contraseña
                    </label>
                    <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800">
                      Recuperar contraseña
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-12 shadow-sm transition-all focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Recordarme y botón de submit (se mantienen igual) */}
                <div className="mb-6 flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Recordarme
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-indigo-600 py-3 px-4 font-bold text-white shadow-lg transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
              </form>

              {/* Separador "O continuar con" */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">O continuar con</span>
                </div>
              </div>


              <div className="mb-4 flex justify-center">
                <div className="w-full max-w-xs ml-6 sm:ml-14 md:ml-20 lg:ml-32 ">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => setError('Error al iniciar sesión con Google')}
                    width="100%"
                    shape="pill"
                    text="continue_with"
                    locale="es"
                    theme="filled_blue"
                  />
                </div>
              </div>


              {/* Enlace a registro */}
              <div className="mt-8 text-center text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
                <Link to="/register" className="font-medium text-indigo-600 transition-colors hover:text-indigo-700">
                  Regístrate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
