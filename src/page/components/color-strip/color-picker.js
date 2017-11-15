import React from 'react';
import _ from 'lodash';

import { MAP, COLOR_MULT, MULT, TOLERANCE } from '../color-map';

export default class ColorPicker extends React.Component {
  render() {
    var colors = [];
    var colorMap = {};
    if (this.props.type === 'multiplier') {
      colorMap = _.invert(COLOR_MULT);
      colors.push(
        <SingleColor color={'silver'} key={100} handleSingle={this.props.handleSingle}/>);
      colors.push(
        <SingleColor color={'gold'} key={10} handleSingle={this.props.handleSingle}/>);
    } else if (this.props.type === 'tolerance') {
      colorMap = _.invert(TOLERANCE);
    } else {
      colorMap = _.invert(MAP);
    }

    const style = {
      left: (parseInt(this.props.pageX) - (175 / 2)).toString() + 'px', //175 width of container
      top: (parseInt(this.props.pageY) - 55).toString() + 'px' //55 height of container
    };

    for (var key in colorMap) {
      colors.push(
          <SingleColor color={key} key={colorMap[key]}
            handleSingle={this.props.handleSingle}/>);
    }
    return (
      <div class='color-picker' style={style} onMouseLeave={this.props.revertState}>
        {colors}
      </div>
    )
  }
}

class SingleColor extends React.Component {

  render() {
    var className;
    var style = null;
    if (this.props.color === 'gold' ||
        this.props.color === 'silver' ||
        this.props.color === 'none') {
      className = 'single-color ' + this.props.color;
    } else {
      className = 'single-color';
      style = {
        background: this.props.color
      };
    }
    return (
      <div class={className} data-state={this.props.color}
        onClick={this.props.handleSingle}
        onMouseEnter={this.props.handleSingle}
        style={style}>
      </div>
    );
  }
}
