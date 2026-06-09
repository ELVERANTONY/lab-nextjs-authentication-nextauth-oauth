import fs from 'fs';
import path from 'path';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  failedLoginAttempts: number;
  lockedUntil?: string | null;
}

const dataFilePath = process.env.VERCEL
  ? path.join('/tmp', 'users.json')
  : path.join(process.cwd(), 'data', 'users.json');

export const getUsers = (): User[] => {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileData);
};

export const saveUsers = (users: User[]) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find((user) => user.email === email);
};

export const updateUser = (email: string, updates: Partial<User>) => {
  const users = getUsers();
  const index = users.findIndex((user) => user.email === email);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    saveUsers(users);
  }
};

export const createUser = (user: Omit<User, 'id' | 'failedLoginAttempts'>) => {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    failedLoginAttempts: 0,
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};
