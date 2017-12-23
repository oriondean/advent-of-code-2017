module.exports = (toParse) => {
  const [registerKey, operator, value, _unused, // eslint-disable-line no-unused-vars
    conditionRegister, conditionOperator, conditionValue] = toParse.split(' ');

  return {
    registerKey,
    operation: {
      operator,
      value: Number(value),
      run: input => (operator === 'inc' && input + Number(value)) || input - Number(value),
    },
    condition: {
      value: Number(conditionValue),
      operator: conditionOperator,
      registerKey: conditionRegister,
      check: (registers) => {
        switch (conditionOperator) {
          case '>':
            return registers[conditionRegister] > Number(conditionValue);
          case '<':
            return registers[conditionRegister] < Number(conditionValue);
          case '<=':
            return registers[conditionRegister] <= Number(conditionValue);
          case '>=':
            return registers[conditionRegister] >= Number(conditionValue);
          case '==':
            return registers[conditionRegister] === Number(conditionValue);
          case '!=':
            return registers[conditionRegister] !== Number(conditionValue);
          default:
            throw new Error(`unknown condition operator: ${conditionOperator}`);
        }
      },
    },
  };
};
