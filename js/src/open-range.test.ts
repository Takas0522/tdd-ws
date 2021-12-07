import { OpenRange } from "./open-range";


describe('Closed Range', () => {
  describe('プロパティ', () => {
    describe ('整数開区間インスタンスは下端点と上端点を持つ', () => {
      it ('インスタンス生成時に3と8を指定すると、インスタンスは下端3、上端8を返却する', () => {
        const target = new OpenRange(3,8);
        expect(target.lower).toEqual(3);
        expect(target.upper).toEqual(8);
      });
    });
    describe ('整数開区間インスタンスは文字列表現を持つ', () => {
      it ('整数開区間インスタンス生成時に3と8を指定すると、インスタンスのtoString()は[3,8]を返却する', () => {
        const target = new OpenRange(3,8);
        const asc = target.toString();
        expect(asc).toEqual('[3,8]');
      });
      it ('整数開区間インスタンス生成時に同値(1,1)を指定すると、インスタンスのtoString()は[1,1]を返却する', () => {
        const target = new OpenRange(1,1);
        const asc = target.toString();
        expect(asc).toEqual('[1,1]');
      });
    });
  });
  describe('Validation', () => {
    describe ('上端点より下端点が大きい整数開区間インスタンスを作ることはできない', () => {
      it ('整数開区間インスタンス生成時に2と1を指定すると、”Range Setting Exception”が返却される', () => {
        expect(() => (new OpenRange(2,1))).toThrow('Range Setting Exception');
      });
    });
  });
  describe('Feature', () => {
    describe ('整数開区間インスタンスは指定した整数を含むかどうかを判定できる', () => {
      describe('閉区間内の値が指定された場合trueが返却される', () => {
        test.each([
          { lower: 1, upper: 4, containCheckValue: 2 },
          { lower: 1, upper: 4, containCheckValue: 3 }
        ])('[$lower,$upper]整数開区間で、isContainに$containCheckValueが指定された場合trueが返却される', ({lower, upper, containCheckValue}) => {
          const target = new OpenRange(lower, upper);
          expect(target.isContain(containCheckValue)).toBeTruthy();
        });
      })
      describe('閉区間外の値が指定された場合falseが返却される', () => {
        test.each([
          { lower: 1, upper: 4, containCheckValue: 1 },
          { lower: 1, upper: 4, containCheckValue: 4 }
        ])('[$lower,$upper]整数開区間で、isContainに$containCheckValueが指定された場合falseが返却される', ({lower, upper, containCheckValue}) => {
          const target = new OpenRange(lower, upper);
          expect(target.isContain(containCheckValue)).toBeFalsy();
        });
      })
    });
    describe ('別の整数開区間インスタンスと等価かどうかが判定できる', () => {
      describe('等価である整数開区間インスタンスが指定された場合trueが返却される', () => {
        it (' [1,4]整数開区間インスタンスのisEqualに別の[1,4]整数開区間インスタンスを指定した場合trueが返却される', () => {
          const base = new OpenRange(1, 4);
          const comparison = new OpenRange(1, 4);
          expect(base.isEqual(comparison)).toBeTruthy();
        });
      });
      describe('等価でない整数開区間インスタンスが指定された場合falseが返却される', () => {
        test.each([
          { basetLower: 1, baseUpper: 4, comparisonLower: 2, comparisonUpper: 4 },
          { basetLower: 1, baseUpper: 4, comparisonLower: 1, comparisonUpper: 5 },
          { basetLower: 1, baseUpper: 4, comparisonLower: 0, comparisonUpper: 4 },
          { basetLower: 1, baseUpper: 4, comparisonLower: 1, comparisonUpper: 3 },
        ])('[$basetLower, $baseUpper]整数開区間インスタンスの、isEqualに別の[$comparisonLower,$comparisonUpper]整数開区間インスタンスが指定された場合falseが返却される', ({basetLower, baseUpper, comparisonLower, comparisonUpper}) => {
          const base = new OpenRange(basetLower, baseUpper);
          const comparison = new OpenRange(comparisonLower, comparisonUpper);
          expect(base.isEqual(comparison)).toBeFalsy();
        } );
      });
    });
    describe ('別の閉区間と完全に含まれるかどうかも判定できる', () => {
      describe('完全に含まれる整数開区間インスタンスが指定された場合trueが返却される', () => {
        test.each([
          { basetLower: 1, baseUpper: 4, comparisonLower: 2, comparisonUpper: 3 },
        ])('[$basetLower,$baseUpper]整数開区間インスタンスのisIncludeに[$comparisonLower,$comparisonUpper]整数開区間インスタンスを指定した場合trueが返却される', ({basetLower, baseUpper, comparisonLower, comparisonUpper}) => {
          const base = new OpenRange(basetLower, baseUpper);
          const comparison = new OpenRange(comparisonLower, comparisonUpper);
          expect(base.isFullInclude(comparison)).toBeTruthy();
        });
      });
      describe('完全に含まれない整数開区間インスタンスが指定された場合falseが返却される', () => {
        test.each([
          { basetLower: 1, baseUpper: 4, comparisonLower: 1, comparisonUpper: 3 },
          { basetLower: 1, baseUpper: 4, comparisonLower: 2, comparisonUpper: 4 },
          { basetLower: 1, baseUpper: 4, comparisonLower: 1, comparisonUpper: 4 },
        ])('[$basetLower,$baseUpper]整数開区間インスタンスのisIncludeに[$comparisonLower,$comparisonUpper]整数開区間インスタンスを指定した場合falseが返却される', ({basetLower, baseUpper, comparisonLower, comparisonUpper}) => {
          const base = new OpenRange(basetLower, baseUpper);
          const comparison = new OpenRange(comparisonLower, comparisonUpper);
          expect(base.isFullInclude(comparison)).toBeFalsy();
        });
      });
    });
  });
});