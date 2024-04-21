import { Request } from 'express';

export interface RequestInterfaceWithUser extends Request {
  user: {
    email: string;
    sub: string;
  };
}
