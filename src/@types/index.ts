export enum Role {
  Admin = 'admin',
  Blogger = 'blogger',
}

export type UserSession = {
  id: number;
};

export type DatabaseDate = {
  created_at: Date;
  updated_at: Date;
};

export type DefaultUserData = {
  role: Role;
};

export interface User extends DatabaseDate {
  id: number;
  email: string;
  username: string;
  password: string;
  role: Role;
}
