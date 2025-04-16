export interface User {
    id: string;
    name: string;
    email: string;
    status: 'active' | 'inactive' | 'pending';
    roles?: Role[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface Role {
    id: string;
    name: string;
    description: string;
    permissions: string[];
  }
  
  export interface UserCredentials {
    email: string;
    password: string;
  }
  
  export interface UserRegistration {
    name: string;
    email: string;
    password: string;
  }