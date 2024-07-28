import { FinanceContorlProps } from "../../models/interfaces/FinanceControlProps/FinanceControlProps";
import { Movement } from "../../models/interfaces/Movement/Movement";
import Balance from "../Balance/Balance";
import Expense from "../Expense/Expense";
import "./FinanceControl.css";

const FinanceControl = ({
    handleSetMovement,
    balance,
    expenses,
}: FinanceContorlProps) => {
    const receveNewMovement = (movement: Movement) => {
        movement && handleSetMovement(movement);
    };

    return (
        <div className="container_finance">
            <Balance
                currentBalance={balance}
                emitMovement={receveNewMovement}
            />
            <Expense
                currentBalance={balance}
                currentExpenses={expenses}
                emitMovement={receveNewMovement}
            />
        </div>
    );
};

export default FinanceControl;