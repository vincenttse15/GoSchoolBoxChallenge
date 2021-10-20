import Operator from './Operators/Operator';

export class Evaluator {
  constructor(expression) {
    this.expression = expression;
    this.operatorStack = [];
    this.operandStack = [];
  }

  process() {
    let operandTwo = this.operandStack.pop();
    let operandOne = this.operandStack.pop();
    let operator = this.operatorStack.pop();
    let result = operator.execute(operandOne, operandTwo);
    this.operandStack.push(result);
  }

  peekOperator() {
    return this.operatorStack[this.operatorStack.length - 1];
  }

  evaluate() {
    const tokenized = this.expression.split(/([-+()*/])/g).filter(Boolean);

    for (let token of tokenized) {
      if (!isNaN(token)) {
        this.operandStack.push(+token);
      } else {
        let operator = new Operator().getOperator(token);

        if (token === "(") {
          this.operatorStack.push(operator);
        }
        else if (token === ")") {
          while (this.operatorStack.length > 0 && this.peekOperator() !== new Operator().getOperator("(")) {
            this.process();
          }

          this.operatorStack.pop();
        }
        else {
          while (this.operatorStack.length > 0 && this.peekOperator() !== new Operator().getOperator("(") && 
                 this.peekOperator().priority() >= operator.priority()) {
                   this.process();
                 }
          this.operatorStack.push(operator);
        }
      }
    }

    while (this.operatorStack.length > 0) {
      this.process();
    }

    return this.operandStack.pop();
  }
}