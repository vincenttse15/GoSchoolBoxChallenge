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
    const tokenized = this.expression.split(/([-+()*/^])/g).filter(Boolean);

    for (let token of tokenized) {
      if (!isNaN(token)) {
        this.operandStack.push(token);
      } 
      else {
        let operator = new Operator().getOperator(token);
        
        // evaluate expression inside parentheses first
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
        
          // evaluate if operator in the stack has a higher priority than current operator that is going to be added
          while (this.operatorStack.length > 0 && this.peekOperator() !== new Operator().getOperator("(") && 
                 this.peekOperator().priority() >= operator.priority()) {
                   this.process();
                 }
          this.operatorStack.push(operator);
        }
      }
    }

    // evaluate the rest of the operators until operatorStack is empty
    while (this.operatorStack.length > 0) {
      this.process();
    }

    // there should not be more than one operand left in the stack after evaluating
    if (this.operandStack.length > 1) return null;

    // check overflow
    if (this.operandStack[this.operandStack.length - 1] > Number.MAX_VALUE || this.operandStack[this.operandStack.length - 1] < Number.MIN_VALUE) return null;

    // checks if the last operand is a number
    return isNaN(this.operandStack[this.operandStack.length - 1]) ? null : this.operandStack.pop();
  }
}