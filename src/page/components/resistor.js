import React from 'react'
import ColorStrip from './color-strip/color-strip';
// import $ from 'jquery';

export default class Resistor extends React.Component {
  render() {
    var style = {
      opacity: this.props.opacity
    };

    const strips = [];
    for (var i = 1; i <= 3; i++) {
      strips.push(<ColorStrip key={i}
          color={this.props.colorCode[i]} solveColor={this.props.solveColor}/>);
    }

    const actions = {
      solveColor: this.props.solveColor,
      revertState: this.props.revertState
    };

    return (
      <div class="resistor" style={style}>
        <div class='pin pin-left'></div>
        <div class='resistor-end'>
          <ColorStrip key={1} color={this.props.colorCode[1]}
            {...actions}/>
        </div>
        <div class='resistor-mid'>
          <ColorStrip key={2} color={this.props.colorCode[2]}
            {...actions}/>
          <ColorStrip type='multiplier' key={3} color={this.props.colorCode[3]}
            {...actions}/>
        </div>
        <div class='resistor-end'>
          <ColorStrip color={this.props.colorTolerance}
            solveTolerance={this.props.solveTolerance}
            revertState={this.props.revertState} type="tolerance" />
        </div>
        <div class='pin pin-right'></div>
      </div>
    )
  }
}
