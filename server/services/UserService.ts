import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserFromSignUpForm, UserSignInInfo } from '../types/userTypes';
import { User } from '../models/User.js';

export class UserService {
  static async create({ email, password, type }: UserFromSignUpForm): Promise<User> {
    if (email.length <= 6) {
      throw new Error('Invalid email');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const passwordHash: string = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user: User = await User.insert({
      email,
      passwordHash,
      type
    });

    return user;
  }

  static async signIn({ email, password = '' }: UserSignInInfo) {
    try {
      const user: User | null = await User.getByEmail(email);

      if (!user) throw new Error('Invalid email');
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid password');

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });

      return token;
    } catch (error: any) {
      error.status = 401;
      throw error;
    }
  }

}