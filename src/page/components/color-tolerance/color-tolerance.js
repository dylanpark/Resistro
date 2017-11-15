import React from 'react';
import ReactDOM from 'react-dom';
import { TOLERANCE } from '../color-map';
import ToleranceComponent from './tolerance-component';

export default class ColorTolerance extends React.Component {
  constructor() {
    super();
    this.state = { componentActive: false };
    this.checkTarget = this.checkTarget.bind(this);
    this.handleSingle = this.handleSingle.bind(this);
    this.switchState = this.switchState.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.checkTarget, false);
  }

  checkTarget(e) {
    const target = ReactDOM.findDOMNode(this);
    if (!target.contains(e.target)) {
      this.setState({ componentActive: false });
    }
  }

  switchState(state, e) {
    if (e.target != ReactDOM.findDOMNode(this) && state == true) {
      return;
    }
    this.setState({ componentActive: state });
  }

  handleSingle(e) {
    this.setState({ componentActive: false });
    this.props.solveTolerance({tolerance: e.target.dataset.value,
      colorTolerance: TOLERANCE[e.target.dataset.value]});
  }

  render() {
    var toleranceComponent = null;
    if (this.state.componentActive) {
      var values = { ...TOLERANCE };
      var left = 48.16; // width of % and +/- sign (default) + number widths
      for (var key in values) {
        if (key === this.props.val) {
          for (var i = 0; i < key.length; i++) {
            if (key[i] === '.') {
              left += 8.34; // width of a period
            } else {
              left += 16.69; //width of numbers
            }
          }
          delete values[key];
        }
      }
      left = left + 'px'; // convert int to to string
      toleranceComponent = <ToleranceComponent values={values}
        handleSingle={this.handleSingle} left={left}
        switchState={this.switchState}/>;
    }

    return (
      <div class='tolerance'
        onClick={this.switchState.bind(this, true)}>
        {this.props.val}
        {toleranceComponent}
      </div>
    )
  }
}
