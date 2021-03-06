import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import RESISTRO_UTILS from 'utils/resistro-utils.js';

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
    let validInput = RESISTRO_UTILS.getValidInput(e.target.value);
    let resistanceValue = RESISTRO_UTILS.convertToOhm(validInput) || validInput;

    e.target.value = validInput;
    this.setState({valueLength: e.target.value.length});

    let resistance = RESISTRO_UTILS.calculateResistance(resistanceValue);
    resistance.inputValue = validInput;
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
