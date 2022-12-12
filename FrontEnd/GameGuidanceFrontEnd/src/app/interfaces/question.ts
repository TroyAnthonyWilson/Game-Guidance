export interface Question {
  questionNumber?: number;
  userQuestion?: string;
  userResponse?: string;
  editResponse?: string; 
  isAnswered: boolean;
  options: string[];
}
