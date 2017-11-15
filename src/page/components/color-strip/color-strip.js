import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import ColorPicker from './color-picker';
import { MAP, MULT, TOLERANCE } from '../color-map';

export default class ColorStrip extends React.Component {
  constructor() {
    super();
    this.state = { colorPickerActive: false };
    this.pageClick = this.pageClick.bind(this);
    this.handleSingle = this.handleSingle.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.pageClick, false);
  }

  pageClick(e) {
    if (ReactDOM.findDOMNode(this).contains(e.target)) {
      if (this.state.colorPickerActive) {
        if (e.pageX > this.state.pageX - 87 && e.pageX < this.state.pageX + 87 &&
            e.pageY > this.state.pageY - 55 && e.pageY < this.state.pageY + 1) {
          return;
        }
      }

      this.setState({
        colorPickerActive: true,
        pageX: e.pageX,
        pageY: e.pageY
      });
      return;
    }
    if (this.state.colorPickerActive) {
      this.props.revertState();
    }
    this.setState({colorPickerActive: false});
  }

  removeColorPicker(e) {
    if (e.type != 'mouseenter') {
      this.setState({colorPickerActive: false});
    }
  }

  handleSingle(e) {
    var bandEl = e.target.parentElement.parentElement;
    var colorPicked = e.target.dataset.state;
    bandEl.dataset.color = colorPicked;
    if (bandEl.dataset.value === 'tolerance') {
      var toleranceMap = _.invert(TOLERANCE);
      this.props.solveTolerance({
        eventType: e.type,
        tolerance: toleranceMap[colorPicked],
        colorTolerance: colorPicked
      });
      this.removeColorPicker(e);
      return;
    }
    const colorMap = _.invert(MAP);
    const colorMult = _.invert(MULT);
    this.removeColorPicker(e);
    var resistors = document.querySelectorAll('.band-main');
    var values = [];
    var colorCode = {};
    resistors.forEach((resistor, i) => {
      var bandColor = colorCode[i + 1] = resistor.dataset.color;
      var multVal;
      if (bandColor === 'silver' || bandColor === 'gold') {
        multVal = bandColor;
      } else {
        multVal = colorMult[bandColor];
      }
      values.push(i === 2 ? multVal : colorMap[bandColor]);
    });
    var value = '';
    if (values[2] === 'silver' || values[2] === 'gold') {
      var divider = values[2] === 'silver' ? 100 : 10;
      value = (parseFloat(values[0] + values[1]) / parseFloat(divider)).toString();
    } else {
      value = values[0] + values[1] + values[2];
    }

    this.props.solveColor({eventType: e.type, colorCode: colorCode, value: value});
  }

  render() {
    const colorPicker = this.state.colorPickerActive
      ? <ColorPicker type={this.props.type} pageX={this.state.pageX} pageY={this.state.pageY}
      handleSingle={this.handleSingle} revertState={this.props.revertState}/> : null;

    var className;
    if (this.props.type === 'multiplier') {
      className = 'band band-main multiplier';
    } else if (this.props.type === 'tolerance') {
      className = 'band band-tolerance';
    } else {
      className = 'band band-main';
    }

    var style = null;
    if (this.props.color === 'gold' || this.props.color === 'silver') {
      className += ' ' + this.props.color;
    } else if (this.props.color === 'none') {
      className += ' none-strip';
    } else {
      style = {background: this.props.color};
    }

    return (
      <div class={className} style={style} data-value={this.props.type} data-color={this.props.color}>
        {colorPicker}
      </div>
    );
  }
}

