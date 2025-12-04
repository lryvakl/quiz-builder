import prisma from '../prisma/prisma.js';
import { SubmitQuizInput } from '../schemas/submission.schema.js';
import { HttpError } from '../utils/HttpError.js';

type AnswersInput = SubmitQuizInput['body']['answers'];

export const processQuizSubmission = async (
  quizId: number,
  userId: number | undefined,
  answers: AnswersInput
) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: true },
  });

  if (!quiz) {
    throw new HttpError(404, 'Quiz not found');
  }

  let score = 0;
  const processedAnswers: { questionId: number; answer: any; isCorrect: boolean }[] = [];
  for (const question of quiz.questions) {
    const userAnswer = answers.find((a) => a.questionId === question.id);

    let isCorrect = false;
    const userValue = userAnswer ? userAnswer.answer : null;
    const correctValue = question.correctAnswers as any;

    if (userValue !== null && correctValue !== null && correctValue !== undefined) {
      switch (question.type) {
        case 'BOOLEAN':
          isCorrect = String(userValue) === String(correctValue);
          break;

        case 'INPUT':
          if (Array.isArray(correctValue)) {
            isCorrect = correctValue.some(
              (ans) => ans.toLowerCase().trim() === String(userValue).toLowerCase().trim()
            );
          } else {
            isCorrect =
              String(userValue).toLowerCase().trim() === String(correctValue).toLowerCase().trim();
          }
          break;

        case 'CHECKBOX':
          if (Array.isArray(userValue) && Array.isArray(correctValue)) {
            const userSet = new Set(userValue.map(String));
            const correctSet = new Set(correctValue.map(String));

            if (userSet.size === correctSet.size) {
              isCorrect = [...userSet].every((val) => correctSet.has(val));
            }
          }
          break;
      }
    }

    if (isCorrect) score++;

    processedAnswers.push({
      questionId: question.id,
      answer: userValue ?? 'Skipped',
      isCorrect,
    });
  }

  const attempt = await prisma.quizAttempt.create({
    data: {
      quizId,
      userId: userId || null,
      score,
      total: quiz.questions.length,
      answers: {
        create: processedAnswers.map((a) => ({
          questionId: a.questionId,
          answer: a.answer,
          isCorrect: a.isCorrect,
        })),
      },
    },
  });

  return {
    score,
    total: quiz.questions.length,
    attemptId: attempt.id,
  };
};
