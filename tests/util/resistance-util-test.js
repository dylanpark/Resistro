import { calculateResistance, getValidInput, convertToOhm } from '../../src/util/resistance-util'

function createColorCode(a, b, c) {
  return {
    colorCode: {
      '1': a,
      '2': b,
      '3': c
    }
  }
}

describe('calculate resistance colour code', ()=>{
  describe('valid resistor values', ()=>{
    test('6100000 should return blue-brown-green', ()=>{
      let expected = createColorCode('blue', 'saddlebrown', 'forestgreen');
      expect(calculateResistance('6100000')).toEqual(expected);
    });
    test('1000 should return brown-black-red', ()=>{
      let expected = createColorCode('saddlebrown', 'black', 'red');
      expect(calculateResistance('1000')).toEqual(expected);
    });
    test('1.5 should return brown-green-gold', ()=>{
      let expected = createColorCode('saddlebrown', 'forestgreen', 'gold');
      expect(calculateResistance('1.5')).toEqual(expected);
    });
    test('7 should return purple-black-gold', ()=>{
      let expected = createColorCode('blueviolet', 'black', 'gold');
      expect(calculateResistance('7')).toEqual(expected);
    });
    test('0.1 should return brown-black-silver', ()=>{
      let expected = createColorCode('saddlebrown', 'black', 'silver');
      expect(calculateResistance('0.1')).toEqual(expected);
    });
    test('0.01 should return none-brown-silver', ()=>{
      let expected = createColorCode( null, 'saddlebrown', 'silver');
      expect(calculateResistance('0.01')).toEqual(expected);
    });
    test('0.34 should return orange-yellow-silver', ()=>{
      let expected = createColorCode( 'orange', 'yellow', 'silver');
      expect(calculateResistance('0.34')).toEqual(expected);
    });
  });

  describe('invalid resistor values', ()=>{
    test('apple should return invalid', ()=>{
      expect(calculateResistance('apple')).toHaveProperty('err');
    });
    test('333 should return invalid', ()=>{
      expect(calculateResistance('333')).toHaveProperty('err');
    });
    test('0 should return invalid', ()=>{
      expect(calculateResistance('0')).toHaveProperty('err');
    });
    test('0.1.0 should return invalid', ()=> {
      expect(calculateResistance('0')).toHaveProperty('err');
    });
    test('0.001 should return invalid', ()=> {
      expect(calculateResistance('0.001')).toHaveProperty('err');
    });
  });
});

describe('get valid input', () => {
  test('123 should return 123', () => {
    expect(getValidInput('123')).toEqual('123');
  });
  test('1.2k should return 1.2k', () => {
    expect(getValidInput('1.2k')).toEqual('1.2k');
  });
  test('5M should return 5M', () => {
    expect(getValidInput('5M')).toEqual('5M');
  });
  test('50.k should return 50k', () => {
    expect(getValidInput('50.k')).toEqual('50k');
  });
  test('50.k should return 50k', () => {
    expect(getValidInput('50.k')).toEqual('50k');
  });
  test('1.2.0 should return 1.2', () => {
    expect(getValidInput('1.2.0')).toEqual('1.20');
  });
});

describe('convert to base ohm', () => {
  test('1k should return 1000', () => {
    expect(convertToOhm('1k')).toEqual(1000);
  });
  test('0.5M should return 500000', () => {
    expect(convertToOhm('0.5M')).toEqual(500000);
  });
  test('100 should return 100', () => {
    expect(convertToOhm('100')).toEqual(100);
  });
  test('23.00G should return 23000000000', () => {
    expect(convertToOhm('0.560G')).toEqual(560000000);
  });
});
