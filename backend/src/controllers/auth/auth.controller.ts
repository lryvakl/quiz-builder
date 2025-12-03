import { Response } from 'express';
import { RequestBody } from '../../types/express.js';
import { RegisterInput, LoginInput } from '../../schemas/auth.schema.js';
import * as authService from '../../services/auth.service.js';
import { HttpError } from '../../utils/HttpError.js';

export const register = async (req: RequestBody<RegisterInput>, res: Response) => {
  try {
    const result = await authService.registerUser(req.body);

    return res.status(201).json({
      message: 'Registration successful',
      ...result,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error('Register Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req: RequestBody<LoginInput>, res: Response) => {
  try {
    const result = await authService.loginUser(req.body);

    return res.status(200).json({
      message: 'Login successful',
      ...result,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
