import { Router } from 'express';
import { createQuizController } from '../controllers/quizzes/createQuiz.controller.js';
import { getAllQuizzesController } from '../controllers/quizzes/getAllQuizzes.controller.js';
import { getQuizByIdController } from '../controllers/quizzes/getQuizById.controller.js';
import { deleteQuizController } from '../controllers/quizzes/deleteQuiz.controller.js';
import { register, login } from '../controllers/auth/auth.controller.js';
import { submitQuiz } from '../controllers/quizzes/submission.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { optionalAuth } from '../middlewares/optionalAuth.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { RegisterSchema, LoginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', validate(RegisterSchema), register);
router.post('/login', validate(LoginSchema), login);
router.get('/quizzes', optionalAuth, getAllQuizzesController);
router.get('/quizzes/:id', getQuizByIdController);
router.post('/quizzes', authMiddleware, createQuizController);
router.delete('/quizzes/:id', authMiddleware, deleteQuizController);
router.post('/quizzes/:id/submit', optionalAuth, submitQuiz);

export default router;
