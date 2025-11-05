import { quizzesService } from '../../services/quizzes.service.js';
export async function getAllQuizzesController(_req, res) {
    try {
        const quizzes = await quizzesService.getAllQuizzes();
        res.status(200).json(quizzes);
    }
    catch (error) {
        res.status(500).json({ message: error.message || 'Failed to fetch quizzes' });
    }
}
