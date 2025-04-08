import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Llamada al backend
    axios.get('http://localhost:3000/api/hello')
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error("Error al conectar con el backend:", err));
  }, []);

  return (
    <div>
      <h1>Frontend con React + Vite</h1>
      <p>Mensaje del backend: <strong>{message || "Cargando..."}</strong></p>
    </div>
  );
}

export default App;
