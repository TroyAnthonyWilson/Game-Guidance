import { Choice } from "./choice";

export interface Question {
  id: number;
  questionName?: string;
  userResponse?: string;
  nameOfUserChoice?: string;
  isAnswered?: boolean;
  options?: Choice[];
}
