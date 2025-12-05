import prisma from '../prisma/prisma.js';

export const getUserProfile = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  if (!user) throw new Error('User not found');

  const attempts = await prisma.quizAttempt.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      quiz: { select: { title: true } },
    },
  });

  const totalQuizzesTaken = attempts.length;

  let averageAccuracy = 0;
  if (totalQuizzesTaken > 0) {
    const totalPercentage = attempts.reduce((acc, curr) => {
      return acc + (curr.score / curr.total) * 100;
    }, 0);
    averageAccuracy = Math.round(totalPercentage / totalQuizzesTaken);
  }

  return {
    user,
    stats: {
      totalQuizzesTaken,
      averageAccuracy,
    },
    history: attempts.map((attempt) => ({
      id: attempt.id,
      quizTitle: attempt.quiz.title,
      score: attempt.score,
      total: attempt.total,
      date: attempt.createdAt,
    })),
  };
};
