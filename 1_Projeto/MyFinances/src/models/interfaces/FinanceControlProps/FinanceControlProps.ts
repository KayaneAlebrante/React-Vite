import { Movement } from "../Movement/Movement";

export interface FinanceContorlProps{
    handleSetMovement: (movement: Movement) => void;
     balance: number;
     expenses: number;
}