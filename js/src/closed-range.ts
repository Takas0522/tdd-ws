import { RangeBase } from './range-base';
import { RangeInterface } from './range.interface';
export class ClosedRange extends RangeBase implements RangeInterface {

  constructor(lower: number, upper: number) {
    super(lower, upper);
  }

  toString(): string {
    return `[${this.lower},${this.upper}]`;
  }

  isContain(value: number): boolean {
    return (value >= this.lower && value <= this.upper);
  }

}
