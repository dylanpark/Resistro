import { calcResistance } from '../../src/util/resistance-util'

function createColorCode(a, b, c) {
  return {
    colorCode: {
      '1': a,
      '2': b,
      '3': c
    }
  }
}

describe('calculate resistance', ()=>{
  describe('valid resistor values', ()=>{
    test('1000 should return brown-black-red-gold', ()=>{
      let expected = createColorCode('saddlebrown', 'black', 'red');
      expect(calcResistance('1000')).toEqual(expected);
    });
    test('1.5 should return brown-green-gold', ()=>{
      let expected = createColorCode('saddlebrown', 'forestgreen', 'gold');
      expect(calcResistance('1.5')).toEqual(expected);
    });
    test('0.1 should return brown-black-silver', ()=>{
      let expected = createColorCode('saddlebrown', 'black', 'silver');
      expect(calcResistance('0.1')).toEqual(expected);
    });
  });

  describe('invalid resistor values', ()=>{
    test('apple should return invalid', ()=>{
      expect(calcResistance('apple')).toHaveProperty('err');
    });
    test('333 should return invalid', ()=>{
      expect(calcResistance('333')).toHaveProperty('err');
    });
    test('0 should return invalid', ()=>{
      expect(calcResistance('0')).toHaveProperty('err');
    })
  });
});
