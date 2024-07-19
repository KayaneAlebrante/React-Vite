import { useState } from 'react'
import './App.css'
import FinanceControl from './components/FinanceControl/FinaceControl'
import Header from './components/Header/Header'
import { Movement } from './models/interfaces/Movement/Movement';

function App() {
 const [currentBalance, setCurrentBalance] = useState(0); //Saldo Atual
 const [currentExpenses, setCurrentExpenses] = useState(0); //Despesaas Atual
 const [movementsItens, setMovementsIntes] = useState<Array<Movement>>([]); //Movimentações


 const setNewMovement = (movement: Movement) => {
  if(movement){
    setMovementsIntes((prevMovements) => {
      const movements = {...prevMovements};
      movements.unshift({
        name: movement.name,
        value: movement.value,
        type: movement.type,
        id: Math.random().toString(),
      });
      return movements;
    });

    movement.type === "Input" && setCurrentBalance(
      (prevBalance) => prevBalance + Number(movement.value)
    );

    if(movement.type === "Output"){
      setCurrentExpenses(
        (prevBalance) => prevBalance + Number(movement.value)
      );
    }

    currentBalance > 0 && setCurrentBalance(
      (prevBalance) => prevBalance - Number(movement.value)
    );
  }
 };

 
  return (
    <div>
      <Header />
      <FinanceControl />
    </div>
  )
}

export default App;
 