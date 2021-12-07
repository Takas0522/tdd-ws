import { RangeInterface } from "./range.interface";

export abstract class RangeBase {

  private _lower = 0;
  private _upper = 0;

  constructor(lower: number, upper: number) {
    this.validation(lower, upper);
    this.init(lower, upper);
  }

  private validation(lower: number, upper: number) {
    if (lower > upper) {
      throw 'Range Setting Exception';
    }
  }

  private init(lower: number, upper: number) {
    this._lower = lower;
    this._upper = upper;
  }

  get lower(): number {
    return this._lower;
  }
  get upper(): number {
    return this._upper;
  }

  toString(): string {
    return `[${this._lower},${this._upper}]`;
  }

  abstract isContain(value: number): boolean;

  isEqual(value: RangeInterface): boolean {
    return (value.lower === this.lower && value.upper === this.upper);
  }

  abstract isFullInclude(value: RangeInterface): boolean;

}
