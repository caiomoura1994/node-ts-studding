import { verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { AppError } from '@exceptions/AppError';
import AuthRepository from '@/repositories/auth.repository';
import { IUser } from '@/interfaces/users.interface';
const { SECRET_KEY } = process.env;

export const authMiddleware = async req => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    if (Authorization) {
      const { _id } = (await verify(Authorization, SECRET_KEY)) as { _id: string };
      const auth = new AuthRepository()
      const findUser = await auth.findById(_id);
      return findUser;
    }

    return null;
  } catch (error) {
    throw new AppError(401, 'Wrong authentication token');
  }
};

export const authChecker: AuthChecker<{ user: IUser }> = async ({ context: { user } }) => {
  if (!user) {
    throw new AppError(404, 'Authentication token missing');
  }

  return true;
};
