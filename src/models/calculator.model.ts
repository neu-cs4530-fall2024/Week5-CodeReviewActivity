import { ActionKeys } from "../enums/action-keys.enum";
import { NumericKeys } from "../enums/numeric-keys.enum";
import { OperatorKeys } from "../enums/operator-keys.enum";
import { State } from "../enums/state.enum";
import { ICalculatorModel } from "../interfaces/calculator-model.interface";
const assert = require("assert");

export class CalculatorModel implements ICalculatorModel {
  private _buffer: string = "";
  private _numberStack: number[] = [];
  private _operatorStack: OperatorKeys[] = [];
  private _state: State = State.ENTERING_FIRST_OPERAND;

  public getState(): State {
    return this._state;
  }

  public setState(state: State) {
    this._state = state;
  }

  public pressNumericKey(key: NumericKeys): void {
    this._buffer += key;
  }

  private pushNumber(): void {
    const num: number = parseFloat(this._buffer);
    this._numberStack.push(num);
    this._buffer = "";
  }

  private popNumber(): number {
    if (this._numberStack.length < 1) {
      throw "stack underflow";
    }
    return this._numberStack.pop();
  }

  public pressOperatorKey(key: OperatorKeys): void {
    this.pushNumber();
    if (this.getState() === State.ENTERING_FIRST_OPERAND) {
      this.setState(State.ENTERING_SECOND_OPERAND);
    } else if (this.getState() === State.ENTERING_SECOND_OPERAND) {
      if (key === OperatorKeys.PLUS || key === OperatorKeys.MINUS) {
        const op: OperatorKeys = this._operatorStack.pop();
        // We can always collapse the stack.
        const right: number = this.popNumber();
        const left: number = this.popNumber();
        const result: number = this.compute(op, left, right);
        this._numberStack = [result];
        this._buffer = "";
      } else {
        assert(key === OperatorKeys.MULT || key === OperatorKeys.DIV);
        this.setState(State.ENTERING_THIRD_OPERAND);
      }
    } else {
      assert(this.getState() === State.ENTERING_THIRD_OPERAND);
      assert(false); // unimplemented
    }
    this._operatorStack.push(key);
  }

  private compute(op: OperatorKeys, left: number, right: number): number {
    switch (op) {
      case OperatorKeys.PLUS:
        return left + right;
      case OperatorKeys.MINUS:
        return left - right;
      case OperatorKeys.MULT:
        return left * right;
      case OperatorKeys.DIV:
        return left / right;
    }
  }

  private prec(op: OperatorKeys): number {
    switch (op) {
      case OperatorKeys.PLUS:
      case OperatorKeys.MINUS:
        return 0;
      case OperatorKeys.MULT:
      case OperatorKeys.DIV:
        return 1;
    }
    assert(false, `Unexpected operator ${op}`);
  }

  public pressActionKey(key: ActionKeys): void {
    switch (key) {
      case ActionKeys.CLEAR:
        this._buffer = "";
        this.setState(State.ENTERING_FIRST_OPERAND);
        break;
      case ActionKeys.DOT:
        this._buffer += ".";
        break;
      case ActionKeys.EQUALS: {
        this.pushNumber();
        if (this.getState() === State.ENTERING_FIRST_OPERAND) {
          this._buffer = this.popNumber().toString();
        } else if (this.getState() === State.ENTERING_SECOND_OPERAND) {
          const op: OperatorKeys = this._operatorStack.pop();
          const right: number = this.popNumber();
          const left: number = this.popNumber();
          const result: number = this.compute(op, left, right);
          this._buffer = result.toString();
        } else {
          assert(this.getState() === State.ENTERING_THIRD_OPERAND);
          assert(this._operatorStack.length === 2);
          const op_right: OperatorKeys = this._operatorStack.pop();
          const op_left: OperatorKeys = this._operatorStack.pop();
          const [v0, v1, v2] = this._numberStack;
          if (this.prec(op_right) > this.prec(op_left)) {
            const right: number = this.compute(op_right, v1, v2);
            const result: number = this.compute(op_left, v0, right);
            this._buffer = result.toString();
          } else {
            const left: number = this.compute(op_left, v0, v1);
            const result: number = this.compute(op_right, left, v2);
            this._buffer = result.toString();
          }
        }
        this._numberStack = [];
        this.setState(State.ENTERING_FIRST_OPERAND);
        break;
      }
      default:
        throw new Error("Invalid Action");
    }
  }

  public display(): string {
    return this._buffer;
  }
}
