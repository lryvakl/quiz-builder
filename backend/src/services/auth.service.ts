import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/prisma.js';
import { RegisterInput, LoginInput } from '../schemas/auth.schema.js';
import { HttpError } from '../utils/HttpError.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const registerUser = async (input: RegisterInput) => {
  const { email, password, name } = input;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new HttpError(409, 'User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });

  const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

  return {
    user: { id: newUser.id, email: newUser.email, name: newUser.name },
    token,
  };
};

export const loginUser = async (input: LoginInput) => {
  const { email, password } = input;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

  return {
    user: { id: user.id, email: user.email, name: user.name },
    token,
  };
};
