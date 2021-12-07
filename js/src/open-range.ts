import { RangeBase } from "./range-base";
import { RangeInterface } from "./range.interface";

export class OpenRange extends RangeBase implements RangeInterface {

  constructor(lower: number, upper: number) {
    super(lower, upper);
  }

  isContain(value: number): boolean {
    return (value > this.lower && value < this.upper);
  }

}
