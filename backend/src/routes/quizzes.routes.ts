import { Router } from 'express';
import { createQuizController } from '../controllers/quizzes/createQuiz.controller.js';
import { getAllQuizzesController } from '../controllers/quizzes/getAllQuizzes.controller.js';
import { getQuizByIdController } from '../controllers/quizzes/getQuizById.controller.js';
import { deleteQuizController } from '../controllers/quizzes/deleteQuiz.controller.js';
import { register, login } from '../controllers/auth/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { RegisterSchema, LoginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post('/register', validate(RegisterSchema), register);
router.post('/login', validate(LoginSchema), login);
router.post('/quizzes', createQuizController);
router.get('/quizzes', getAllQuizzesController);
router.get('/quizzes/:id', getQuizByIdController);
router.delete('/quizzes/:id', deleteQuizController);
export default router;
