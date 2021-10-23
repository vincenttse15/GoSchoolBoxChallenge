import { useState } from "react";
import Screen from '../Screen/Screen';
import Buttons from '../Buttons/Buttons';
import './Calculator.css';

const Calculator = () => {
  const [previousExpression, setPreviousExpression] = useState('');
  const [expression, setExpression] = useState('');

  return (
    <div className="calculator-container">
      <Screen previousExpression={previousExpression} expression={expression} />
      <Buttons expression={expression} setExpression={setExpression} setPreviousExpression={setPreviousExpression} />
    </div>
  )
}

export default Calculator;