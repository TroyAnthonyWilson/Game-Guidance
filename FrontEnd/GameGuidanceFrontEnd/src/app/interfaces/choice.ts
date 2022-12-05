import { Question } from "./question";

export interface Choice {
        id: number;
        apiChoiceId : number;
        questionId: number;
        question?: Question;
        choiceName: string;
}
