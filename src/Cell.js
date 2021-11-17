import React, {Component} from 'react'
import "./Cell.css"

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  //  * - flipCellsAroundMe: a function rec'd from the board which flips this
  //  *      cell and the cells around of it
  handleClick(evt) {
    this.props.flipCellsAroundMe();
  }

  render() {
    let classes = "Cell" + (this.props.isLit ? " Cell-lit" : "");
    return (
        <td className={classes} onClick={this.handleClick} />
    )
  }
}


export default Cell