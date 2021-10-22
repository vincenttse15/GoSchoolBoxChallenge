import './Screen.css';

const Screen = (props) => {
  const {
    previousExpression,
    expression,
  } = props;

  return (
    <div className="text-container">
      {previousExpression === ''
        ?
        <div className="expression prev-expression">{' '}</div>
        :
        <div className="expression prev-expression">{previousExpression}</div>
      }
      {expression === ''
        ?
        <div className="expression current-expression">0</div>
        :
        <div className="expression current-expression">{expression}</div>
      }
    </div>
  )
}

export default Screen;