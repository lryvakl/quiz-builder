import { Request, Response } from 'express';
import { SubmitQuizInput } from '../../schemas/submission.schema.js';
import * as submissionService from '../../services/submission.service.js';
import { HttpError } from '../../utils/HttpError.js';

type Params = SubmitQuizInput['params'];
type ReqBody = SubmitQuizInput['body'];

export const submitQuiz = async (req: Request<Params, unknown, ReqBody>, res: Response) => {
  try {
    const quizId = Number(req.params.id);
    const userId = req.user?.userId;
    const { answers } = req.body;

    const result = await submissionService.processQuizSubmission(quizId, userId, answers);

    return res.status(200).json({
      message: 'Quiz submitted successfully',
      result,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error('Submit Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
