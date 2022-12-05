import { Choice } from "./choice";
import { Observable } from 'rxjs';

export interface Question {
  id: number;
  questionName?: string;
  userResponse?: string;
  isAnswered?: boolean;
  options?: string[];
}
