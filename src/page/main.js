import React from 'react';
import PropTypes from 'prop-types';
import Resistor from './components/resistor';
import ColorInput from './components/color-input/color-input';
import ColorTolerance from './components/color-tolerance/color-tolerance.js';

export default class Main extends React.Component {
  render() {
    return(
      <div>
        <Resistor
          revertState={this.props.revertState}
          colorTolerance={this.props.colorTolerance}
          solveTolerance={this.props.solveTolerance}
          solveColor={this.props.solveColor}
          colorCode={this.props.colorCode}
          opacity={this.props.opacity}/>
        <div class='input-container'>
          <ColorInput
            value={this.props.value}
            findColor={this.props.findColor}
            findColorError={this.props.findColorError}/>
          <div class='ohm-symbol'>Ω</div>
          <ColorTolerance 
            val={this.props.tolerance}
            solveTolerance={this.props.solveTolerance}/>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  revertState: PropTypes.func,
  colorTolerance: PropTypes.string,
  solveTolerance: PropTypes.func,
  solveColor: PropTypes.func,
  colorCode: PropTypes.array,
  opacity: PropTypes.string,
  value: PropTypes.string,
  findColor: PropTypes.func,
  findColorError: PropTypes.func,
  tolerance: PropTypes.string
}
