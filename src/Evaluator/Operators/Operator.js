class Operator {
  priority() {
    throw new Error('function not implemented');
  }

  execute(operandOne, operandTwo) {
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

class AddOperator extends Operator {
  priority() {
    return 1;
  }

  execute(operandOne, operandTwo) {
    let result = +operandOne + +operandTwo;
    return result.toString();
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
}

class LParen extends Operator {
  priority() {
    return 0;
  }

  execute(operandOne, operandTwo) {
    return null;
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
}

class RParen extends Operator {
  priority() {
    return 0;
  }

  execute(operandOne, operandTwo) {
    return null;
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
}

class ExponentOperator extends Operator {
  priority() {
    return 3;
  }

  execute(operandOne, operandTwo) {
    let result = Math.pow(+operandOne, +operandTwo);
    return result.toString();
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
}


export default Operator;