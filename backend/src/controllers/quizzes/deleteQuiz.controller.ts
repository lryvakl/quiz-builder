import { Request, Response } from 'express';
import { quizzesService } from '../../services/quizzes.service.js';

export async function deleteQuizController(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid quiz ID' });
    }

    await quizzesService.deleteQuizById(id);
    res.status(204).send(); // No Content
  } catch (error: any) {
    const message = error.message === 'Quiz not found' ? error.message : 'Failed to delete quiz';
    res.status(error.message === 'Quiz not found' ? 404 : 500).json({ message });
  }
}
