import { Request, Response } from 'express';
import * as userService from '../../services/user.service.js';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const profile = await userService.getUserProfile(userId);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};
