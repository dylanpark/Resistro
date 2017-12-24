import { MAP, MULT } from '../page/components/color-map';

const prefixSymbolMap = {
  'k': 1000,
  'K': 1000,
  'M': 1000000,
  'G': 1000000000
}

/**
 * Calculates the resistor colour code values
 * @param {number} resistanceValue - the resistor value in ohms
 */
export function calculateResistance(resistanceValue) {
  var colorCode = {};
  var testVal = parseFloat(resistanceValue, 10).toString();
  const inputVal = testVal == 'NaN' ? '' : testVal;
  if (inputVal === '') {
    return {err: 'Not a valid resistor'};
  }
  var ohm = testVal;

  if (ohm.length == 0 || parseFloat(ohm) === 0) {
    return {err: 'Not a valid resistor'};
  }

  if (ohm.indexOf('.') + 1) {
    let decimalCount = 0;
    var multColor;
    var firstBandColorNull = false;
    var secondBandColor;
    while (ohm.indexOf('.') + 1) {
      ohm = (parseFloat(ohm, 10) * 10).toString();
      decimalCount++;
    }
    if (decimalCount == 1) {
      multColor = ohm.length === 1 ? 'silver' : 'gold';
      secondBandColor = ohm.length === 1 ? 'black' : null;
    } else if (decimalCount == 2) {
      multColor = 'silver';
      firstBandColorNull = ohm.length === 1;
      secondBandColor = ohm.length === 1 ? MAP[ohm[0]] : null;
    } else {
      return {err: 'Not a valid resistor'};
    }
  }

  colorCode['1'] = firstBandColorNull ? null : MAP[ohm[0]];
  colorCode['2'] = secondBandColor || (testVal.length === 1 ? 'black' : MAP[ohm[1]]);
  ohm = ohm.substring(2);

  if (!(ohm in MULT)) {
    return {err: 'Not a valid resistor'};
  }
  colorCode['3'] = multColor || (testVal.length === 1 ? 'gold' : MULT[ohm]);
  return {colorCode: colorCode};
}

/**
 * Returns a valid input string
 * @param {string} input - the input value
 */
export function getValidInput(input) {
  let prefixIndex, decimalIndex;
  for (var i = 0; i < input.length; i++) {
    let isPrefix = isPrefixCharacter(input[i]);
    if ((isNaN(parseInt(input[i])) && input[i] !== '.' && !isPrefix)
        || (input[i] === '.' && decimalIndex)
        || (isPrefix && prefixIndex)
        || (prefixIndex < i)) {
          input = input.slice(0, i) + input.slice(i+1, input.length);
    }

    if (input[i] === '.') {
      decimalIndex = i;
    } else if (isPrefix) {
      prefixIndex = i;

      // remove trailing decimal when prefix is present
      // i.e. 5.k => 5k
      if (decimalIndex + 1 === prefixIndex) {
        input = input.slice(0, decimalIndex) +
          input.slice(prefixIndex, prefixIndex + 1);
      }
    }
  }
  return input;
}

/**
 * Returns a resistance number in base ohms
 * @param {string} input - the input value
 */
export function convertToOhm(input) {
  let last = input.slice(-1);
  if (isPrefixCharacter(last)) {
    return parseFloat(input) * prefixSymbolMap[last];
  }
  return parseFloat(input);
}

function isPrefixCharacter(c) {
  return c in prefixSymbolMap;
}
