import './App.css';
import { RiDivideFill, RiCloseFill } from 'react-icons/ri';
import { CgMathMinus, CgMathEqual, CgMathPlus} from 'react-icons/cg';

function App() {
  return (
    <div className="App">
      <div className="calculator-container">
        <div className="text-container">

        </div>
        <div className="buttons-container">
          <div className="row-container">
            <button className="button operators">(</button>
            <button className="button operators">)</button>
            <button className="button operators">AC</button>
            <button className="button operators">DEL</button>
          </div>

          <div className="row-container">
            <button className="button numbers">7</button>
            <button className="button numbers">8</button>
            <button className="button numbers">9</button>
            <button className="button operators">
              <RiDivideFill className="icon"/>
            </button>
          </div>

          <div className="row-container">
            <button className="button numbers">4</button>
            <button className="button numbers">5</button>
            <button className="button numbers">6</button>
            <button className="button operators">
              <RiCloseFill className="icon"/>
            </button>
          </div>

          <div className="row-container">
            <button className="button numbers">1</button>
            <button className="button numbers">2</button>
            <button className="button numbers">3</button>
            <button className="button operators">
              <CgMathMinus className="icon"/>
            </button>
          </div>

          <div className="row-container">
            <button className="button numbers">0</button>
            <button className="button numbers">.</button>
            <button className="button equal">
              <CgMathEqual className="icon"/>
            </button>
            <button className="button operators">
              <CgMathPlus className="icon"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
