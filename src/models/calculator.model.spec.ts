import { CalculatorModel } from "./calculator.model";
import { ICalculatorModel } from "../interfaces/calculator-model.interface";
import { NumericKeys } from "../enums/numeric-keys.enum";
import { OperatorKeys } from "../enums/operator-keys.enum";
import { State } from "../enums/state.enum";
import { ActionKeys } from "../enums/action-keys.enum";

describe("CalculatorModel", (): void => {
  let calculator: ICalculatorModel;

  beforeEach((): void => {
    calculator = new CalculatorModel();
  });

  it("should contain a CalculatorModel class that implements ICalculatorModel", (): void => {
    expect(calculator).toBeDefined();
  });

  it("should have an empty display on init", (): void => {
    // Act
    const displayValue: string = calculator.display();

    // Assert
    expect(displayValue).toEqual("");
  });

  it("should display `1` when the `1` key is pressed", (): void => {
    // Act
    calculator.pressNumericKey(NumericKeys.ONE);
    const displayValue: string = calculator.display();

    // Assert
    expect(displayValue).toEqual("1");
  });

  it("should clear the display when clear is pressed", (): void => {
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressActionKey(ActionKeys.CLEAR);
    const displayValue: string = calculator.display();
    expect(displayValue).toEqual("");
  });

  it("should display a dot when dot is pressed", (): void => {
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressActionKey(ActionKeys.DOT);
    const displayValue: string = calculator.display();
    expect(displayValue).toEqual("1.");
  });

  it("add more digits after a dot", (): void => {
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressActionKey(ActionKeys.DOT);
    calculator.pressNumericKey(NumericKeys.TWO);
    const displayValue: string = calculator.display();
    expect(displayValue).toEqual("1.2");
  });

  it("should display `2` when the `2` key is pressed", (): void => {
    calculator.pressNumericKey(NumericKeys.TWO);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual("2");
  });

  it("should display `98` when the `9` key is pressed followed by the `8` key", (): void => {
    calculator.pressNumericKey(NumericKeys.NINE);
    calculator.pressNumericKey(NumericKeys.EIGHT);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual("98");
  });

  it("should display `13` when equals is clicked on `7 + 6`", (): void => {
    calculator.pressNumericKey(NumericKeys.SEVEN);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.SIX);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual("13");
  });

  it("should display `5` when equals is clicked on `15 - 10`", (): void => {
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.FIVE);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.ZERO);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual("5");
  });

  it("should display `21` when equals is clicked on `3 * 7`", (): void => {
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.SEVEN);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual("21");
  });

  it("should display `12` when equals is clicked on `144 / 12`", (): void => {
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressActionKey(ActionKeys.EQUALS);
    const displayValue: string = calculator.display();

    expect(displayValue).toEqual("12");
  });

  it("plus followed by plus", (): void => {
    // 2+3+4 should be 9
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.display()).toEqual("9");
  });

  it("mult followed by mult", (): void => {
    // 2*3*4 should be 24
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.display()).toEqual("24");
  });

  it("div followed by div", (): void => {
    // 16/4/2 should be 2, not 8
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressNumericKey(NumericKeys.SIX);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.display()).toEqual("2");
  });

  it("plus followed by minus", (): void => {
    // 2+3-4 should be 1
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.display()).toEqual("1");
  });

  it("minus followed by minus", (): void => {
    // 2-3-4 should be 9
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.display()).toEqual("-5");
  });

  it("minus followed by plus", (): void => {
    // 2-3+4 should be 3
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.display()).toEqual("3");
  });

  it("mult binds tighter than plus (on left)", (): void => {
    // 2*3+4 should be 10, not 14
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.display()).toEqual("10");
  });

  it("mult binds tighter than plus (on right)", (): void => {
    // 2+3*4 should be 14, not 20
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.display()).toEqual("14");
  });

  it("mult binds tighter than sub (on left)", (): void => {
    // 2*3-4 should be 2, not -2
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.display()).toEqual("2");
  });

  it("mult binds tighter than sub (on right)", (): void => {
    // 2-3*4 should be -10, not -4
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.display()).toEqual("-10");
  });

  it("div binds tighter than plus (on left)", (): void => {
    // 4/2+3 should be 5, not 0.8
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.display()).toEqual("5");
  });

  it("div binds tighter than plus (on right)", (): void => {
    // 3+4/2 should be 5, not 3.5
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.display()).toEqual("5");
  });

  it("div binds tighter than sub (on left)", (): void => {
    // 4/2-3 should be -1, not -4
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.display()).toEqual("-1");
  });

  it("div binds tighter than sub (on right)", (): void => {
    // 3-4/2 should be 1, not -0.5
    calculator.pressNumericKey(NumericKeys.THREE);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    calculator.pressNumericKey(NumericKeys.FOUR);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    calculator.pressNumericKey(NumericKeys.TWO);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.display()).toEqual("1");
  });
});

describe("CalculatorStateMachine", (): void => {
  let calculator: CalculatorModel;

  beforeEach((): void => {
    calculator = new CalculatorModel();
  });

  const enterSecondState = (calculator: CalculatorModel) => {
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    expect(calculator.getState()).toBe(State.ENTERING_SECOND_OPERAND);
  };

  const enterThirdState = (calculator: CalculatorModel) => {
    enterSecondState(calculator);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    expect(calculator.getState()).toBe(State.ENTERING_THIRD_OPERAND);
  };

  it("first with number remains in first", (): void => {
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
    calculator.pressNumericKey(NumericKeys.ONE);
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
  });

  it("first with + transitions to second", (): void => {
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    expect(calculator.getState()).toBe(State.ENTERING_SECOND_OPERAND);
  });

  it("first with - transitions to second", (): void => {
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    expect(calculator.getState()).toBe(State.ENTERING_SECOND_OPERAND);
  });

  it("first with * transitions to second", (): void => {
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    expect(calculator.getState()).toBe(State.ENTERING_SECOND_OPERAND);
  });

  it("first with / transitions to second", (): void => {
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    expect(calculator.getState()).toBe(State.ENTERING_SECOND_OPERAND);
  });

  it("first with = remains in first", (): void => {
    calculator.pressNumericKey(NumericKeys.ONE);
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
  });

  it("first with dot remains in first", (): void => {
    calculator.pressNumericKey(NumericKeys.ONE);
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
    calculator.pressActionKey(ActionKeys.DOT);
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
  });

  it("first with clear remains in first", (): void => {
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
    calculator.pressActionKey(ActionKeys.CLEAR);
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
  });

  it("second with number remains in second", (): void => {
    enterSecondState(calculator);
    calculator.pressNumericKey(NumericKeys.ONE);
    expect(calculator.getState()).toBe(State.ENTERING_SECOND_OPERAND);
  });

  it("second with dot remains in second", (): void => {
    enterSecondState(calculator);
    calculator.pressActionKey(ActionKeys.DOT);
    expect(calculator.getState()).toBe(State.ENTERING_SECOND_OPERAND);
  });

  it("second with + remains in second", (): void => {
    enterSecondState(calculator);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressOperatorKey(OperatorKeys.PLUS);
    expect(calculator.getState()).toBe(State.ENTERING_SECOND_OPERAND);
  });

  it("second with - remains in second", (): void => {
    enterSecondState(calculator);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressOperatorKey(OperatorKeys.MINUS);
    expect(calculator.getState()).toBe(State.ENTERING_SECOND_OPERAND);
  });

  it("second with * transitions to third", (): void => {
    enterSecondState(calculator);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressOperatorKey(OperatorKeys.MULT);
    expect(calculator.getState()).toBe(State.ENTERING_THIRD_OPERAND);
  });

  it("second with / transitions to third", (): void => {
    enterSecondState(calculator);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressOperatorKey(OperatorKeys.DIV);
    expect(calculator.getState()).toBe(State.ENTERING_THIRD_OPERAND);
  });

  it("second with = transitions to first", (): void => {
    enterSecondState(calculator);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
  });

  it("second with clear transitions to first", (): void => {
    enterSecondState(calculator);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressActionKey(ActionKeys.CLEAR);
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
  });

  it("second with dot remains in second", (): void => {
    enterSecondState(calculator);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressActionKey(ActionKeys.DOT);
    expect(calculator.getState()).toBe(State.ENTERING_SECOND_OPERAND);
  });

  it("third with number remains in third", (): void => {
    enterThirdState(calculator);
    calculator.pressNumericKey(NumericKeys.ONE);
    expect(calculator.getState()).toBe(State.ENTERING_THIRD_OPERAND);
  });

  it("third with = transitions to first", (): void => {
    enterThirdState(calculator);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressActionKey(ActionKeys.EQUALS);
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
  });

  it("third with clear transitions to first", (): void => {
    enterThirdState(calculator);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressActionKey(ActionKeys.CLEAR);
    expect(calculator.getState()).toBe(State.ENTERING_FIRST_OPERAND);
  });

  it("third with dot remains in third", (): void => {
    enterThirdState(calculator);
    calculator.pressNumericKey(NumericKeys.ONE);
    calculator.pressActionKey(ActionKeys.DOT);
    expect(calculator.getState()).toBe(State.ENTERING_THIRD_OPERAND);
  });

  // TODO(max): What happens if +/- entered in the third state?
  // TODO(max): What happens if */div entered in the third state?
  // TODO(max): What happens if you hit = twice?
  // TODO(max): What happens if you divide by zero?
  // TODO(max): What happens if you hit an operator before a number at the
  // beginning (probably should default to 0)?
});
