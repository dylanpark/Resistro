import React from 'react';
import { TOLERANCE } from '../color-map';

export default class ToleranceComponent extends React.Component {

  render() {
    var singles = [];
    var counter = 0;
    const style = {
      left: this.props.left
    }
    for (var key in this.props.values) {
       singles.push(
         <div class='single-tolerance' key={counter}
           onClick={this.props.handleSingle} data-value={key}> {key} </div>);
       counter++;
    }
    return (
      <div class='c-tolerance' style={style}>
        {singles}
      </div>
    );
  }
}
