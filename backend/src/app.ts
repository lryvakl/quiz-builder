import express from 'express';
import cors from 'cors';
import quizzesRouter from './routes/quizzes.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Quiz Builder API is running 🚀' });
});

app.use('/quizzes', quizzesRouter);

export default app;
