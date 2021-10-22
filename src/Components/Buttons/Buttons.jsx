import { RiDivideFill, RiCloseFill } from 'react-icons/ri';
import { CgMathMinus, CgMathEqual, CgMathPlus } from 'react-icons/cg';
import { Evaluator } from '../../Evaluator/Evaluator';
import './Buttons.css';

const Buttons = (props) => {
  const {
    setExpression,
    setPreviousExpression,
    expression
  } = props;

  return (
    <div className="buttons-container">
      <div className="row-container">
        <button className="button operators" onClick={() => setExpression(expression + "^")}>
          X
          <span className="superscript">y</span>
        </button>
        <button className="button operators">
          (-)
        </button>
      </div>
      <div className="row-container">
        <button className="button operators" onClick={() => setExpression(expression + "(")}>(</button>
        <button className="button operators" onClick={() => setExpression(expression + ")")}>)</button>
        <button className="button operators"
          onClick={() => {
            setExpression('');
            setPreviousExpression('');
          }
          }
        >
          AC
        </button>
        <button className="button operators"
          onClick={() => {
            if (expression.length > 0) setExpression(expression.slice(0, expression.length - 1));
          }
          }
        >
          DEL
        </button>
      </div>

      <div className="row-container">
        <button className="button numbers" onClick={() => setExpression(expression + "7")}>7</button>
        <button className="button numbers" onClick={() => setExpression(expression + "8")}>8</button>
        <button className="button numbers" onClick={() => setExpression(expression + "9")}>9</button>
        <button className="button operators" onClick={() => setExpression(expression + "/")}>
          <RiDivideFill className="icon" />
        </button>
      </div>

      <div className="row-container">
        <button className="button numbers" onClick={() => setExpression(expression + "4")}>4</button>
        <button className="button numbers" onClick={() => setExpression(expression + "5")}>5</button>
        <button className="button numbers" onClick={() => setExpression(expression + "6")}>6</button>
        <button className="button operators" onClick={() => setExpression(expression + "*")}>
          <RiCloseFill className="icon" />
        </button>
      </div>

      <div className="row-container">
        <button className="button numbers" onClick={() => setExpression(expression + "1")}>1</button>
        <button className="button numbers" onClick={() => setExpression(expression + "2")}>2</button>
        <button className="button numbers" onClick={() => setExpression(expression + "3")}>3</button>
        <button className="button operators" onClick={() => setExpression(expression + "-")}>
          <CgMathMinus className="icon" />
        </button>
      </div>

      <div className="row-container">
        <button className="button numbers" onClick={() => setExpression(expression + "0")}>0</button>
        <button className="button numbers" onClick={() => setExpression(expression + ".")}>.</button>
        <button className="button equal"
          onClick={() => {
            const evaluator = new Evaluator(expression);
            let result = evaluator.evaluate();
            if (result !== null) {
              result = result.toString();
              let ePos = result.indexOf("e+");

              if (ePos !== - 1) {
                let operandOne = result.slice(0, ePos);
                let operandTwo = result.slice(ePos + 2);
                setPreviousExpression(expression);
                setExpression(operandOne + "*10^" + operandTwo);
              } else {
                setPreviousExpression(expression);
                setExpression(result);
              }
            }
            else {
              setPreviousExpression("Invalid expression!");
            }
          }
          }
        >
          <CgMathEqual className="icon" />
        </button>
        <button className="button operators" onClick={() => setExpression(expression + "+")}>
          <CgMathPlus className="icon" />
        </button>
      </div>
    </div>
  )
}

export default Buttons;