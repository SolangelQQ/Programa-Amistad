import mysql, { RowDataPacket, OkPacket } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export function getConnection() {
  return mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'best_buddies',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

export async function initializeDatabase(): Promise<void> {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'best_buddies'}`);
  await connection.end();

  const db = getConnection();

  // Create tables if they don't exist
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      status ENUM('active', 'inactive', 'pending') NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS roles (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      description TEXT,
      permissions JSON,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS user_roles (
      user_id VARCHAR(36) NOT NULL,
      role_id VARCHAR(36) NOT NULL,
      PRIMARY KEY (user_id, role_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
    )
  `);

  // Insert default roles if they don't exist
  const [existingRoles] = await db.execute<RowDataPacket[]>('SELECT id FROM roles');
  if (existingRoles.length === 0) {{
    const defaultRoles = [
      {
        id: '1',
        name: 'Administrador',
        description: 'Administrador del sistema con todos los permisos',
        permissions: JSON.stringify([
          'user:create', 'user:read', 'user:update', 'user:delete',
          'role:create', 'role:read', 'role:update', 'role:delete',
          'friendship:manage', 'activity:manage', 'document:manage', 'report:generate'
        ]),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '2',
        name: 'Encargado Programa',
        description: 'Encargado del programa Amistad',
        permissions: JSON.stringify([
          'user:read', 'friendship:manage', 'activity:manage', 'document:manage', 'report:generate'
        ]),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '3',
        name: 'Líder Buddies',
        description: 'Líder de personas con discapacidad intelectual',
        permissions: JSON.stringify(['user:read', 'friendship:manage']),
        created_at: new Date(),
        updated_at: new Date()
      }
    ];

    for (const role of defaultRoles) {
      await db.execute(
        'INSERT INTO roles (id, name, description, permissions, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
        [role.id, role.name, role.description, role.permissions, role.created_at, role.updated_at]
      );
    }
  }
  }
}