import { quizzesService } from '../../services/quizzes.service.js';
export async function createQuizController(req, res) {
    try {
        const quiz = await quizzesService.createQuiz(req.body);
        res.status(201).json(quiz);
    }
    catch (error) {
        res.status(400).json({ message: error.message || 'Failed to create quiz' });
    }
}
