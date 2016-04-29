import React, {PropTypes} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import {DragSource} from 'react-dnd';
import {DropTarget} from 'react-dnd';

const ItemTypes = {
  NWGridRow: 'nwgridrow'
}

const itemSource = {
  beginDrag(props) {
    return {id: props.id};
  }
}

const itemTarget = {

  hover(props, monitor) {
    //console.log('begin droping note', props);
    const {id} = monitor.getItem();
    //console.log('begin droping note', props);
    //getItem Returns a string or an ES6 symbol identifying the type of the current dragged item. Returns null if no item is being dragged.
    if (id != props.id) {
      props.parent.moveRow(id, props.id);
    }
  }
}
function collectSource(connect, monitor) {
  return {connectDragSource: connect.dragSource(), isDragging: monitor.isDragging()}
}
function collectTarget(connect) {
  return {connectDropTarget: connect.dropTarget()}
}

class NWGridRow extends React.Component {
  constructor (props) {
    super(props);

  }

  static propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired
  };
  setData (data) {
    this.refs['input1'].value = data.name || '';
    this.refs['input2'].value = data.mail || '';
    this.refs['input3'].value = data.note || '';
    this.refs['input4'].value = data.device || '';

  }

  componentDidMount () {
    this.setData(this.props.data);
  }
  getData () {
    return {name: this.refs['input1'].value, mail: this.refs['input2'].value, note: this.refs['input3'].value, device: this.refs['input4'].value}
  }
  handleChange () {
  
    this.props.parent.removeRow(this.props.id);
  }
  render () {
    const {connectDragSource, connectDropTarget, isDragging} = this.props;

    const opacity = isDragging
      ? 0
      : 1;
    return connectDragSource(connectDropTarget( < tr style = {
      {
        opacity: opacity
      }
    } > <td>{this.props.serial + 1}
      <input type="button" onClick={(e) => this.handleChange(e)} className="form-control" value="Delete"/>
    </td> < td > <input ref="input1" type="text" className="form-control"/> < /td>
  						  <td><input ref="input2" type="text" className="form-control" / > </td> < td > <textarea ref="input3" className="form-control"/> < /td>
  						  <td><input ref="input4" type="text" className="form-control"/ > </td> < /tr>
          ))
  }
}

const source = DragSource(ItemTypes.NWGridRow, itemSource, collectSource)(NWGridRow)
const row = DropTarget(ItemTypes.NWGridRow, itemTarget, collectTarget)(source)
export default row
