import React from 'react';
import ReactDOM from 'react-dom';
import { MAP, MULT } from '../color-map';
import ColorStrip from '../color-strip/color-strip.js';

export default class ColorInput extends React.Component {

  constructor() {
    super();
    this.focusOnInput = this.focusOnInput.bind(this);
    this.updateResistor = this.updateResistor.bind(this);
    this.calcResistance = this.calcResistance.bind(this);
  }

  //Right before the component loads
  componentWillmount() {
    this.state = {valueLength: 4};
  }

  //As soon as the webpage load
  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this);
    //Make the input element editable right off the start
    this.el.focus();
    //This is to always have focus on input element
    document.addEventListener('click', this.focusOnInput, false);
  }

  focusOnInput(e) {
    // if clicked outside of input element, focus on the input
    if (!this.el.contains(e.target)) {
      this.el.value = this.el.value;
      this.el.focus();
    }
  }

  updateResistor(e) {
    var node = ReactDOM.findDOMNode(this);
    var inputEl = e.target;
    var cloneValue = inputEl.value;

    var prefixIndex, decimalIndex;
    var resistanceValue;

    for (var i = 0; i < cloneValue.length; i++) {
      var isPrefixCharacter = (['k', 'K', 'M'].indexOf(cloneValue[i]) + 1);
      if ((isNaN(parseInt(cloneValue[i])) && cloneValue[i] !== '.'
          && !isPrefixCharacter)
          || (cloneValue[i] === '.' && decimalIndex)
          || (isPrefixCharacter && prefixIndex)
          || (prefixIndex < i)) {
        cloneValue = cloneValue.slice(0, i) + cloneValue.slice(i+1, cloneValue.length);
      }

      if (cloneValue[i] === '.') {
        decimalIndex = i;
      } else if (isPrefixCharacter) {
        prefixIndex = i;
        if (cloneValue[i] === 'k' || cloneValue[i] === 'K') {
          resistanceValue = (parseFloat(cloneValue) * 1000).toString();
        } else if (cloneValue[i] === 'M') {
          resistanceValue = (parseFloat(cloneValue) * 1000000).toString();
        }
        if (decimalIndex + 1 === prefixIndex) {
          cloneValue = cloneValue.slice(0, decimalIndex) +
            cloneValue.slice(prefixIndex, prefixIndex + 1);
        }
      }
    }

    inputEl.value = cloneValue;
    resistanceValue = resistanceValue || e.target.value;

    this.setState({valueLength: e.target.value.length});

    var resistance = this.calcResistance(resistanceValue, e);
    resistance.inputValue = cloneValue;
    if (resistance.err) {
      this.props.findColorError(resistance);
    } else {
      this.props.findColor(resistance);
    }
  }

  calcResistance(resistanceValue, e) {
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
        secondBandColor = ohm.length === 1 ? 'black' : null;
      }
    }

    colorCode['1'] = MAP[ohm[0]];
    colorCode['2'] = secondBandColor || (testVal.length === 1 ? 'black' : MAP[ohm[1]]);
    ohm = ohm.substring(2);

    if (!(ohm in MULT)) {
      return {err: 'Not a valid resistor'};
    }
    colorCode['3'] = multColor || (testVal.length === 1 ? 'gold' : MULT[ohm]);
    return {colorCode: colorCode};
  }

  render() {
    const style = {
      width: 24.25 * (this.props.value ? this.props.value.length : (this.state ? this.state.valueLength : 4))
        + 20 + 'px'
    }

    var attr = {
      onInput: this.updateResistor,
      defaultValue: '1000',
      maxLength: '9',
      style: style
    };

    if (this.props.value) {
      attr.value = this.props.value;
    }

    return (
      <input class='color-input' {...attr} />
    );
  }
}
