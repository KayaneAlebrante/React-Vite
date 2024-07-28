import { FinanceContorlProps } from "../../models/interfaces/FinanceControlProps/FinanceControlProps";
import { Movement } from "../../models/interfaces/Movement/Movement";
import Balance from "../Balance/Balance";
import "./FinanceControl.css";

const FinanceControl = ({ 
    handleSetMovement, 
    balance, 
    expenses,
    }: FinanceContorlProps) => {
        const receveNewMovement =(movement: Movement) =>{
            movement && handleSetMovement(movement);
        };

    return(
        <div className="container_finance">
            <Balance 
              currentBalance={balance}
              emitMovement={receveNewMovement}          
            />
            {/* EXPRENSE */}            
        </div>
    );
};

export default FinanceControl;