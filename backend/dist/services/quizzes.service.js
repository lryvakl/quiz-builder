import prisma from '../prisma/prisma.js';
import { Prisma } from '@prisma/client';
class QuizzesService {
    async createQuiz(data) {
        if (!data.title.trim()) {
            throw new Error('Quiz title is required');
        }
        if (!Array.isArray(data.questions) || data.questions.length === 0) {
            throw new Error('At least one question is required');
        }
        const quiz = await prisma.quiz.create({
            data: {
                title: data.title,
                questions: {
                    create: data.questions.map((q, i) => ({
                        text: q.text,
                        type: q.type,
                        order: q.order ?? i,
                        options: q.options ?? Prisma.JsonNull,
                        correctAnswers: q.correctAnswers ?? Prisma.JsonNull,
                    })),
                },
            },
            include: { questions: true },
        });
        return quiz;
    }
    async getAllQuizzes() {
        const quizzes = await prisma.quiz.findMany({
            include: {
                _count: {
                    select: { questions: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return quizzes.map((q) => ({
            id: q.id,
            title: q.title,
            questionsCount: q._count.questions,
        }));
    }
    async getQuizById(id) {
        const quiz = await prisma.quiz.findUnique({
            where: { id },
            include: {
                questions: {
                    orderBy: { order: 'asc' },
                },
            },
        });
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        return {
            id: quiz.id,
            title: quiz.title,
            createdAt: quiz.createdAt,
            questions: quiz.questions.map((q) => ({
                id: q.id,
                text: q.text,
                type: q.type,
                order: q.order,
                options: (q.options ?? undefined),
                correctAnswers: (q.correctAnswers ?? undefined),
            })),
        };
    }
    async deleteQuizById(id) {
        const existing = await prisma.quiz.findUnique({ where: { id } });
        if (!existing)
            throw new Error('Quiz not found');
        await prisma.quiz.delete({ where: { id } });
        return { message: `Quiz with ID ${id} deleted` };
    }
}
export const quizzesService = new QuizzesService();
