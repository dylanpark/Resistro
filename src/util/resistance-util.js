import { MAP, MULT } from '../page/components/color-map';

export function calcResistance(resistanceValue) {
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
