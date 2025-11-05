import { Request, Response } from 'express';
import { quizzesService } from '../../services/quizzes.service.js';

export async function createQuizController(req: Request, res: Response) {
  try {
    const quiz = await quizzesService.createQuiz(req.body);
    res.status(201).json(quiz);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Failed to create quiz' });
  }
}
