import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

export const comparePassword = (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
