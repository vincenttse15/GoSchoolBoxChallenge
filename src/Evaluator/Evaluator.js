import Operator from './operators/Operator';
import { OperatorMap } from './operators/Operator';

export class Evaluator {
  constructor(expression) {
    this.expression = expression;
    this.operatorStack = [];
    this.operandStack = [];
  }

  process() {
    let operator = this.operatorStack.pop();
    if (!operator.twoOperands()) {
      let operandOne = this.operandStack.pop();
      let result = operator.execute(operandOne);
      this.operandStack.push(result);
    } else {
      let operandTwo = this.operandStack.pop();
      let operandOne = this.operandStack.pop();
      let result = operator.execute(operandOne, operandTwo);
      this.operandStack.push(result);
    }
  }

  peekOperator() {
    return this.operatorStack[this.operatorStack.length - 1];
  }

  // checks if there are two operators in a row that are not parentheses and minus because it can be used for a negative number
  validateExpression() {
    for (let i = 0; i < this.expression.length - 1; i++) {
      if (this.expression[i] in OperatorMap && this.expression[i + 1] in OperatorMap) {
        if (this.expression[i] !== "(" && this.expression[i] !== ")" &&
            this.expression[i + 1] !== "(" && this.expression[i + 1] !== ")" && this.expression[i + 1] !== "-") {
              return false;
            }
      }
    }

    return true;
  }

  // replace scientific notation e
  convertScientificNotation() {
    this.expression = this.expression.replace("e", "*10^");
  }

  // replaces the negative signs with "$" so it does not get tokenized as an operator
  getNegativeNumbers() {
    // if there is a minus in the first character it will always be used for a negative number
    if (this.expression[0] === "-") {
      this.expression = "$" + this.expression.slice(1);
    }

    for (let i = 1; i < this.expression.length - 1; i++) {
      if (this.expression[i - 1] in OperatorMap && this.expression[i] === "-") {
        let firstHalf = this.expression.slice(0, i);
        let secondHalf = this.expression.slice(i + 1);
        this.expression = firstHalf + "$" + secondHalf;
      }
    }
  }

  evaluate() {
    this.convertScientificNotation();
    let valid = this.validateExpression();
    if (!valid) return null;

    this.getNegativeNumbers();

    const tokenized = this.expression.split(/([-+()*/^])/g).filter(Boolean);
    console.log(tokenized);
    for (let token of tokenized) {
      if (!isNaN(token)) {
        this.operandStack.push(token);
      }
      else if (token.includes("$")) {
        let modifiedToken = token.replace("$", "-");
        this.operandStack.push(modifiedToken);
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
        
          // evaluate if last operator in the stack has a higher priority than current operator that is going to be added
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
    if (this.operandStack[this.operandStack.length - 1] > Number.MAX_SAFE_INTEGER || this.operandStack[this.operandStack.length - 1] < Number.MIN_SAFE_INTEGER) return "overflow";

    // checks if the last operand is a number
    return isNaN(this.operandStack[this.operandStack.length - 1]) ? null : this.operandStack.pop();
  }
}