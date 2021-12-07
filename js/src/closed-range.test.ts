import { ClosedRange } from "./closed-range";

describe('Closed Range', () => {
  describe('プロパティ', () => {
    describe ('整数閉区間インスタンスは下端点と上端点を持つ', () => {
      it ('インスタンス生成時に1と2を指定すると、インスタンスは下端1、上端2を返却する', () => {
        const target = new ClosedRange(1,2);
        expect(target.lower).toEqual(1);
        expect(target.upper).toEqual(2);
      });
    });
    describe ('整数閉区間インスタンスは文字列表現を持つ', () => {
      it ('整数閉区間インスタンス生成時に1と2を指定すると、インスタンスのtoString()は[1,2]を返却する', () => {
        const target = new ClosedRange(1,2);
        const asc = target.toString();
        expect(asc).toEqual('[1,2]');
      });
      it ('整数閉区間インスタンス生成時に同値(1,1)を指定すると、インスタンスのtoString()は[1,1]を返却する', () => {
        const target = new ClosedRange(1,1);
        const asc = target.toString();
        expect(asc).toEqual('[1,1]');
      });
    });
  });
  describe('Validation', () => {
    describe ('上端点より下端点が大きい整数閉区間インスタンスを作ることはできない', () => {
      it ('整数閉区間インスタンス生成時に2と1を指定すると、”Range Setting Exception”が返却される', () => {
        expect(() => (new ClosedRange(2,1))).toThrow('Range Setting Exception');
      });
    });
  });
  describe('Feature', () => {
    describe ('整数閉区間インスタンスは指定した整数を含むかどうかを判定できる', () => {
      describe('閉区間内の値が指定された場合trueが返却される', () => {
        test.each([
          { lower: 1, upper: 3, containCheckValue: 1 },
          { lower: 1, upper: 3, containCheckValue: 3 }
        ])('[$lower,$upper]整数閉区間で、isContainに$containCheckValueが指定された場合trueが返却される', ({lower, upper, containCheckValue}) => {
          const target = new ClosedRange(lower, upper);
          expect(target.isContain(containCheckValue)).toBeTruthy();
        });
      })
      describe('閉区間外の値が指定された場合falseが返却される', () => {
        test.each([
          { lower: 1, upper: 3, containCheckValue: 0 },
          { lower: 1, upper: 3, containCheckValue: 4 }
        ])('[$lower,$upper]整数閉区間で、isContainに$containCheckValueが指定された場合falseが返却される', ({lower, upper, containCheckValue}) => {
          const target = new ClosedRange(lower, upper);
          expect(target.isContain(containCheckValue)).toBeFalsy();
        });
      })
    });
    describe ('別の整数閉区間インスタンスと等価かどうかが判定できる', () => {
      describe('等価である整数閉区間インスタンスが指定された場合trueが返却される', () => {
        it (' [1,3]整数閉区間インスタンスのisEqualに別の[1,3]整数閉区間インスタンスを指定した場合trueが返却される', () => {
          const base = new ClosedRange(1, 3);
          const comparison = new ClosedRange(1, 3);
          expect(base.isEqual(comparison)).toBeTruthy();
        });
      });
      describe('等価でない整数閉区間インスタンスが指定された場合falseが返却される', () => {
        test.each([
          { basetLower: 1, baseUpper: 3, comparisonLower: 2, comparisonUpper: 3 },
          { basetLower: 1, baseUpper: 3, comparisonLower: 1, comparisonUpper: 4 },
          { basetLower: 1, baseUpper: 3, comparisonLower: 0, comparisonUpper: 3 },
          { basetLower: 1, baseUpper: 3, comparisonLower: 1, comparisonUpper: 2 },
        ])('[$basetLower, $baseUpper]整数閉区間インスタンスの、isEqualに別の[$comparisonLower,$comparisonUpper]整数閉区間インスタンスが指定された場合falseが返却される', ({basetLower, baseUpper, comparisonLower, comparisonUpper}) => {
          const base = new ClosedRange(basetLower, baseUpper);
          const comparison = new ClosedRange(comparisonLower, comparisonUpper);
          expect(base.isEqual(comparison)).toBeFalsy();
        } );
      });
    });
    describe ('別の閉区間と完全に含まれるかどうかも判定できる', () => {
      describe('完全に含まれる整数閉区間インスタンスが指定された場合trueが返却される', () => {
        test.each([
          { basetLower: 1, baseUpper: 4, comparisonLower: 2, comparisonUpper: 3 },
          { basetLower: 1, baseUpper: 4, comparisonLower: 1, comparisonUpper: 3 },
          { basetLower: 1, baseUpper: 4, comparisonLower: 2, comparisonUpper: 4 },
          { basetLower: 1, baseUpper: 4, comparisonLower: 1, comparisonUpper: 4 },
        ])('[$basetLower,$baseUpper]整数閉区間インスタンスのisIncludeに[$comparisonLower,$comparisonUpper]整数閉区間インスタンスを指定した場合trueが返却される', ({basetLower, baseUpper, comparisonLower, comparisonUpper}) => {
          const base = new ClosedRange(basetLower, baseUpper);
          const comparison = new ClosedRange(comparisonLower, comparisonUpper);
          expect(base.isFullInclude(comparison)).toBeTruthy();
        });
      });
      describe('完全に含まれない整数閉区間インスタンスが指定された場合falseが返却される', () => {
        test.each([
          { basetLower: 1, baseUpper: 4, comparisonLower: 0, comparisonUpper: 4 },
          { basetLower: 1, baseUpper: 4, comparisonLower: 1, comparisonUpper: 5 },
          { basetLower: 1, baseUpper: 4, comparisonLower: 0, comparisonUpper: 5 },
        ])('[$basetLower,$baseUpper]整数閉区間インスタンスのisIncludeに[$comparisonLower,$comparisonUpper]整数閉区間インスタンスを指定した場合falseが返却される', ({basetLower, baseUpper, comparisonLower, comparisonUpper}) => {
          const base = new ClosedRange(basetLower, baseUpper);
          const comparison = new ClosedRange(comparisonLower, comparisonUpper);
          expect(base.isFullInclude(comparison)).toBeFalsy();
        });
      });
    });
  });
});