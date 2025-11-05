import { quizzesService } from '../../services/quizzes.service.js';
export async function getQuizByIdController(req, res) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid quiz ID' });
        }
        const quiz = await quizzesService.getQuizById(id);
        res.status(200).json(quiz);
    }
    catch (error) {
        res.status(404).json({ message: error.message || 'Quiz not found' });
    }
}
