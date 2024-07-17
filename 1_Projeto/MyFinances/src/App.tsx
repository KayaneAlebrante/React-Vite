import './App.css'
import FinanceControl from './components/FinanceControl/FinaceControl'
import Header from './components/Header/Header'

function App() {
  const finances = () => {
  alert("Acionado")
  }

  return (
    <div>
      <Header />
      <FinanceControl />
    </div>
  )
}

export default App
