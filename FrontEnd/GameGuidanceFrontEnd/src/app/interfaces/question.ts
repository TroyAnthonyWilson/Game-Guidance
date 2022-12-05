export interface Question {
  questionNumber?: number;
  userQuestion?: string;
  userResponse?: string;
  isAnswered: boolean;
  options: string[];
}
