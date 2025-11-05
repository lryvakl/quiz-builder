export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export interface CreateQuestionDto {
  text: string;
  type: QuestionType;
  order?: number;
  options?: string[];
  correctAnswers?: string[];
}

export interface CreateQuizDto {
  title: string;
  questions: CreateQuestionDto[];
}
