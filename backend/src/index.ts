import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' })); // Permite conexiones desde el frontend
app.use(express.json()); // Para parsear JSON

// Ruta de ejemplo
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: "Hola desde fab!" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
