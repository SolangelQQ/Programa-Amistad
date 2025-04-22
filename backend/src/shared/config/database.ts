// import mysql, { RowDataPacket, OkPacket } from 'mysql2/promise';
// import dotenv from 'dotenv';
// import bcrypt from 'bcrypt';

// dotenv.config();

// export function getConnection() {
//   return mysql.createPool({
//     host: process.env.DB_HOST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.DB_NAME || 'best_buddies',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
//   });
// }

// export async function initializeDatabase(): Promise<void> {
//   let adminConnection;
//   try {
//     // Connection for creating database if it doesn't exist
//     adminConnection = await mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD
//     });

//     await adminConnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'best_buddies'}`);
//     await adminConnection.end();

//     // Get connection from pool for remaining operations
//     const pool = getConnection();
//     const conn = await pool.getConnection();

//     try {
//       await conn.beginTransaction();

//       // Create tables with foreign key checks disabled
//       await conn.execute(`SET FOREIGN_KEY_CHECKS = 0`);
      
//       // 1. Create users table
//       await conn.execute(`
//         CREATE TABLE IF NOT EXISTS users (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           name VARCHAR(255) NOT NULL,
//           email VARCHAR(255) NOT NULL UNIQUE,
//           password VARCHAR(255) NOT NULL,
//           status ENUM('active', 'inactive') DEFAULT 'active',
//           created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//           updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )
//       `);

//       // 2. Create roles table
//       await conn.execute(`
//         CREATE TABLE IF NOT EXISTS roles (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           name VARCHAR(255) NOT NULL UNIQUE,
//           description TEXT,
//           created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//           updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )
//       `);

//       // 3. Create permissions table
//       await conn.execute(`
//         CREATE TABLE IF NOT EXISTS permissions (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           name VARCHAR(255) NOT NULL UNIQUE,
//           description TEXT,
//           created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
//           updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )
//       `);

//       // 4. Create user_roles relation table
//       await conn.execute(`
//         CREATE TABLE IF NOT EXISTS user_roles (
//           user_id INT NOT NULL,
//           role_id INT NOT NULL,
//           PRIMARY KEY (user_id, role_id),
//           FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
//           FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
//         )
//       `);

//       // 5. Create role_permissions relation table
//       await conn.execute(`
//         CREATE TABLE IF NOT EXISTS role_permissions (
//           role_id INT NOT NULL,
//           permission_id INT NOT NULL,
//           PRIMARY KEY (role_id, permission_id),
//           FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
//           FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
//         )
//       `);
      
//       await conn.execute(`SET FOREIGN_KEY_CHECKS = 1`);

//       // Insert default permissions if they don't exist
//       const [existingPermissions] = await conn.execute<RowDataPacket[]>('SELECT id FROM permissions');
//       if (existingPermissions.length === 0) {
//         const defaultPermissions = [
//           ['crear_usuarios', 'Permite crear nuevos usuarios'],
//           ['editar_usuarios', 'Permite editar usuarios existentes'],
//           ['eliminar_usuarios', 'Permite eliminar usuarios'],
//           ['ver_usuarios', 'Permite ver la lista de usuarios'],
//           ['crear_roles', 'Permite crear nuevos roles'],
//           ['editar_roles', 'Permite editar roles existentes'],
//           ['eliminar_roles', 'Permite eliminar roles'],
//           ['ver_roles', 'Permite ver la lista de roles'],
//           ['asignar_roles', 'Permite asignar roles a usuarios']
//         ];

//         for (const [name, description] of defaultPermissions) {
//           await conn.execute(
//             `INSERT INTO permissions (name, description) VALUES (?, ?)`,
//             [name, description]
//           );
//         }
//       }

//       // Insert default roles if they don't exist
//       const [existingRoles] = await conn.execute<RowDataPacket[]>('SELECT id FROM roles');
//       if (existingRoles.length === 0) {
//         const defaultRoles = [
//           {
//             name: 'Administrador',
//             description: 'Acceso completo al sistema'
//           },
//           {
//             name: 'Encargado Programa',
//             description: 'Gestiona el programa Amistad'
//           }
//         ];

//         for (const role of defaultRoles) {
//           await conn.execute(
//             `INSERT INTO roles (name, description) VALUES (?, ?)`,
//             [role.name, role.description]
//           );
//         }

//         // Assign all permissions to Admin role (id 1)
//         await conn.execute(`
//           INSERT INTO role_permissions (role_id, permission_id)
//           SELECT 1, id FROM permissions
//           ON DUPLICATE KEY UPDATE role_id = role_id
//         `);
//       }

//       // Create admin user if it doesn't exist
//       const [adminUsers] = await conn.execute<RowDataPacket[]>(
//         'SELECT id FROM users WHERE email = ?', 
//         ['admin@amistad.com']
//       );

//       if (adminUsers.length === 0) {
//         const hashedPassword = await bcrypt.hash('admin123', 10);
        
//         // Insert admin user
//         const [result] = await conn.execute<OkPacket>(
//           `INSERT INTO users (name, email, password, status) 
//            VALUES (?, ?, ?, ?)`,
//           [
//             'Administrador',
//             'admin@amistad.com',
//             hashedPassword,
//             'active'
//           ]
//         );

//         // Assign Admin role to the created user
//         await conn.execute(
//           `INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)`,
//           [result.insertId, 1]
//         );
//       }

//       await conn.commit();
//     } catch (error) {
//       await conn.rollback();
//       throw error;
//     } finally {
//       conn.release();
//     }
//   } catch (error) {
//     console.error('Error initializing database:', error);
//     throw error;
//   }
// }



import mysql, { RowDataPacket, OkPacket } from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

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
  let adminConnection;
  try {
    adminConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    await adminConnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'best_buddies'}`);
    await adminConnection.end();

    const pool = getConnection();
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();
      await conn.execute(`SET FOREIGN_KEY_CHECKS = 0`);

      await conn.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          status ENUM('active', 'inactive') DEFAULT 'active',
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      await conn.execute(`
        CREATE TABLE IF NOT EXISTS roles (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE,
          description TEXT,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      await conn.execute(`
        CREATE TABLE IF NOT EXISTS permissions (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL UNIQUE,
          description TEXT,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      await conn.execute(`
        CREATE TABLE IF NOT EXISTS user_roles (
          user_id INT NOT NULL,
          role_id INT NOT NULL,
          PRIMARY KEY (user_id, role_id),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
        )
      `);

      await conn.execute(`
        CREATE TABLE IF NOT EXISTS role_permissions (
          role_id INT NOT NULL,
          permission_id INT NOT NULL,
          PRIMARY KEY (role_id, permission_id),
          FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
          FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
        )
      `);

      await conn.execute(`SET FOREIGN_KEY_CHECKS = 1`);

      const [existingPermissions] = await conn.execute<RowDataPacket[]>('SELECT id FROM permissions');
      if (existingPermissions.length === 0) {
        const defaultPermissions = [
          ['crear_usuarios', 'Permite crear nuevos usuarios'],
          ['editar_usuarios', 'Permite editar usuarios existentes'],
          ['eliminar_usuarios', 'Permite eliminar usuarios'],
          ['ver_usuarios', 'Permite ver la lista de usuarios'],
          ['crear_roles', 'Permite crear nuevos roles'],
          ['editar_roles', 'Permite editar roles existentes'],
          ['eliminar_roles', 'Permite eliminar roles'],
          ['ver_roles', 'Permite ver la lista de roles'],
          ['asignar_roles', 'Permite asignar roles a usuarios']
        ];

        for (const [name, description] of defaultPermissions) {
          await conn.execute(
            `INSERT INTO permissions (name, description) VALUES (?, ?)`,
            [name, description]
          );
        }
      }

      const [existingRoles] = await conn.execute<RowDataPacket[]>('SELECT id FROM roles');
      if (existingRoles.length === 0) {
        const defaultRoles = [
          { name: 'Administrador', description: 'Acceso completo al sistema' },
          { name: 'Encargado Programa', description: 'Gestiona el programa Amistad' }
        ];

        for (const role of defaultRoles) {
          await conn.execute(
            `INSERT INTO roles (name, description) VALUES (?, ?)`,
            [role.name, role.description]
          );
        }

        await conn.execute(`
          INSERT INTO role_permissions (role_id, permission_id)
          SELECT 1, id FROM permissions
          ON DUPLICATE KEY UPDATE role_id = role_id
        `);

        const [[encargadoRole]] = await conn.execute<RowDataPacket[]>(
          `SELECT id FROM roles WHERE name = 'Encargado Programa'`
        );

        const [[verUsuariosPerm]] = await conn.execute<RowDataPacket[]>(
          `SELECT id FROM permissions WHERE name = 'ver_usuarios'`
        );
        const [[verRolesPerm]] = await conn.execute<RowDataPacket[]>(
          `SELECT id FROM permissions WHERE name = 'ver_roles'`
        );

        await conn.execute(
          `INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?), (?, ?)
           ON DUPLICATE KEY UPDATE role_id = role_id`,
          [encargadoRole.id, verUsuariosPerm.id, encargadoRole.id, verRolesPerm.id]
        );
      }

      const [adminUsers] = await conn.execute<RowDataPacket[]>(
        'SELECT id FROM users WHERE email = ?', 
        ['admin@amistad.com']
      );

      if (adminUsers.length === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 10);

        const [result] = await conn.execute<OkPacket>(
          `INSERT INTO users (name, email, password, status) 
           VALUES (?, ?, ?, ?)`,
          ['Administrador', 'admin@amistad.com', hashedPassword, 'active']
        );

        await conn.execute(
          `INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)`,
          [result.insertId, 1]
        );
      }

      await conn.commit();
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
