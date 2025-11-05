import { Request, Response } from 'express';
import { quizzesService } from '../../services/quizzes.service.js';

export async function getAllQuizzesController(_req: Request, res: Response) {
  try {
    const quizzes = await quizzesService.getAllQuizzes();
    res.status(200).json(quizzes);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to fetch quizzes' });
  }
}
