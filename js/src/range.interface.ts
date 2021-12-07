export interface RangeInterface {

  get lower(): number;
  get upper(): number;

  toString(): string;

  isContain(value: number): boolean;

  isEqual(value: RangeInterface): boolean;

  isFullInclude(value: RangeInterface): boolean;
}
