import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { calcResistance } from '../../../util/resistance-util.js';

export default class ColorInput extends React.Component {

  constructor() {
    super();
    this.focusOnInput = this.focusOnInput.bind(this);
    this.updateResistor = this.updateResistor.bind(this);
  }

  //Right before the component loads
  componentWillmount() {
    this.setState({valueLength: 4});
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

    var resistance = calcResistance(resistanceValue);
    resistance.inputValue = cloneValue;
    if (resistance.err) {
      this.props.findColorError(resistance);
    } else {
      this.props.findColor(resistance);
    }
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

ColorInput.propTypes = {
  findColorError: PropTypes.func,
  findColor: PropTypes.func,
  value: PropTypes.string
}
