class Operator {
  priority() {
    throw new Error('function not implemented');
  }

  execute(operandOne, operandTwo) {
    throw new Error('function not implemented');
  }

  twoOperands() {
    throw new Error('function not implemented');
  }

  getOperator(token) {
    if (token in OperatorMap) {
      return OperatorMap[token];
    }

    return null;
  }

  check(token) {
    if (token in OperatorMap) {
      return true;
    }

    return false;
  }
}

// Tried separating child classes into their own folder, but when importing them into this file it gave an error
// TypeError: Class extends value undefined is not a constructor or null
class AddOperator extends Operator {
  priority() {
    return 1;
  }

  execute(operandOne, operandTwo) {
    let result = +operandOne + +operandTwo;
    return result.toString();
  }
  
  twoOperands() {
    return true;
  }
}

class DivideOperator extends Operator {
  priority() {
    return 2;
  }

  execute(operandOne, operandTwo) {
    let result = +operandOne / +operandTwo;
    return result.toString();
  }

  twoOperands() {
    return true;
  }
}

class LParen extends Operator {
  priority() {
    return 0;
  }

  execute(operandOne, operandTwo) {
    return null;
  }

  twoOperands() {
    return false;
  }
}

class MultiplyOperator extends Operator {
  priority() {
    return 2;
  }

  execute(operandOne, operandTwo) {
    let result = +operandOne * +operandTwo;
    return result.toString();
  }

  twoOperands() {
    return true;
  }
}

class RParen extends Operator {
  priority() {
    return 0;
  }

  execute(operandOne, operandTwo) {
    return null;
  }

  twoOperands() {
    return false;
  }
}

class SubtractOperator extends Operator {
  priority() {
    return 1;
  }

  execute(operandOne, operandTwo) {
    let result = +operandOne - +operandTwo;
    return result.toString();
  }

  twoOperands() {
    return true;
  }
}

class ExponentOperator extends Operator {
  priority() {
    return 3;
  }

  execute(operandOne, operandTwo) {
    let result = Math.pow(+operandOne, +operandTwo);
    return result.toString();
  }

  twoOperands() {
    return true;
  }
}

class SquareRootOperator extends Operator {
  priority() {
    return 3;
  }

  execute(operandOne, operandTwo) {
    let result = Math.sqrt(+operandOne);
    return result.toString();
  }

  twoOperands() {
    return false;
  }
}

export const OperatorMap = {
  "+" : new AddOperator(),
  "-" : new SubtractOperator(),
  "*" : new MultiplyOperator(),
  "/" : new DivideOperator(),
  "(" : new LParen(),
  ")" : new RParen(),
  "^" : new ExponentOperator(),
  "sqrt" : new SquareRootOperator(),
}


export default Operator;