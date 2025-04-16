export type Permission = 
  | 'user:create'
  | 'user:read'
  | 'user:update'
  | 'user:delete'
  | 'role:create'
  | 'role:read'
  | 'role:update'
  | 'role:delete'
  | 'friendship:manage'
  | 'activity:manage'
  | 'document:manage'
  | 'report:generate';