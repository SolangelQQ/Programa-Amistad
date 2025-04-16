import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../core/application/auth.service';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await authService.login({ email, password });
      navigate('/dashboard');
    } catch (err: unknown) {
      const error = err as ErrorResponse;
      setError(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential;
      const user = await authService.loginWithGoogle(token);
      console.log('Usuario autenticado con Google:', user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error en login con Google:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="722105965023-gfb5s3nu6fplfug3oh9li381l7ol9nh3.apps.googleusercontent.com">
      {/* Cambiado el fondo a un color más amigable y suave */}
      <div className="flex min-h-screen items-center justify-center bg-indigo-50 p-4">
        <div className="w-full max-w-4xl animate-[fadeIn_0.6s_ease] overflow-hidden rounded-xl bg-white shadow-xl">
          {/* Panel izquierdo con logo */}
          <div className="flex">
            <div className="flex w-2/5 flex-col items-center justify-center bg-gradient-to-b from-indigo-600 to-indigo-800 px-8 py-16 text-center text-white">
              <div className="mb-8 w-4/5 max-w-[220px] rounded-xl bg-indigo-500 p-6 shadow-lg">
                <img
                  src="/logo.jpeg"
                  alt="Best Buddies Bolivia Logo"
                  className="h-auto w-full"
                />
              </div>
              <h1 className="mb-2 text-2xl font-bold">
                Bienvenido 
              </h1>
              <h1 className="mb-2 text-2xl font-bold">
                Best Buddies Bolivia
              </h1>
              <p className="text-lg text-indigo-100">
                Programa Amistad
              </p>
            </div>

            {/* Panel de contenido con formulario */}
            <div className="w-3/5 bg-white px-10 py-12">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-3xl font-bold text-gray-800">Iniciar sesión</h2>
                <p className="text-gray-600">
                  Ingresa tus datos para continuar 
                </p>
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
                      type="password"
                      id="password"
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 shadow-sm transition-all focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                    />
                  </div>
                </div>

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

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">O continuar con</span>
                </div>
              </div>

              {/* Versión personalizada del botón de Google con el mismo estilo */}
              <div className="mb-4">
                <button 
                  type="button"
                  className="flex w-full items-center justify-center rounded-lg bg-indigo-600 py-3 px-4 font-bold text-white shadow-lg transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-200"
                  onClick={() => {
                    // Trigger native Google login
                    const googleButton = document.querySelector('button[aria-label="Sign in with Google"]');
                    if (googleButton) {
                      (googleButton as HTMLButtonElement).click();
                    }
                  }}
                >
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ffffff" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                  Continuar con Google
                </button>
              </div>

              {/* Botón original de Google (oculto visualmente pero funcional) */}
              <div className="hidden" ref={googleButtonRef}>
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => console.log('Login fallido')}
                  size="large"
                  text="continue_with"
                  shape="pill"
                  width="100%"
                />
              </div>

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