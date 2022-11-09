const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { UserFromSignUpForm, HashedUserFormInput } from '../../common/userTypes';
import { User } from '../models/User';

export class UserService {
  static async create({ email, password, type }: UserFromSignUpForm) {
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
}