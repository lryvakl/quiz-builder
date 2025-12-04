import { Request, Response } from 'express';
import { quizzesService } from '../../services/quizzes.service.js';

export async function getAllQuizzesController(req: Request, res: Response) {
  try {
    const userId = req.user?.userId;

    const quizzes = await quizzesService.getAllQuizzes(userId);

    res.json(quizzes);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to fetch quizzes' });
  }
}
