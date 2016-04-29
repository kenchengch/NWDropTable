import React, {PropTypes} from 'react';

import NWGridRow from './NWGridRow.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import request from 'superagent';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';

function deepClone(obj){
  var x = obj.constructor();
  for(var k in obj){
    if( obj.hasOwnProperty(k) ){
      var v = obj[k];
      if( v === null || typeof v !== 'object') x[k] = v;
      else x[k] = deepClone(v);
    }
  }
  return x;
}

class NWGrid extends React.Component {


    constructor(props) {
      super(props);
      this.cnt = 0;
        this.state = {
          rows: []
      }
    }

    push(data){
        var {rows} = this.state;
        var id = this.cnt++;

        rows.push({key:id,
            data: data
        });
        this.setState({ rows: rows });
    }

    pop(data){
        var {rows} = this.state;
        this.cnt-- ;

        rows.pop();
        this.setState({ rows: rows });
    }

    loadDataFromServer() {
      request.get(this.props.source)
        .end(function(err, res){
          //source="https://api.github.com/users/octocat/gists"
          //console.log(JSON.stringify(res.toString()));
          //var objJson =  JSON.parse(JSON.stringify(res.body));
          //console.log(objJson[0].url);
          this.setState({data: res});
        })
    }

    componentDidMount() {
        //this.loadDataFromServer();
        this.push({

        name: 'test',
        mail: 'abc@example.com',
        note: '88 moon',
        device: ''

      })
    }

    getData(){
      var rows = this.state.rows;
      var arr = [];
      for(var i=0; i<rows.length; i++){
        var r = rows[i];
        arr.push( deepClone(this.refs[r.key].getData()) );
      }
      return arr;
    }

    removeRow(i){

        var rows = this.state.rows;
        rows.splice(i, 1);
        this.setState({ rows: rows });
    }
    moveRow(id, afterId){

        var rows = _.clone(this.state.rows);

        var afterRow  = _.filter(rows,(n) => (n.key===afterId))[0];
        var currentRow = _.filter(rows, (n) => (n.key===id))[0];

        var currentRowIndex = rows.indexOf(currentRow);

        var afterRowIndex = rows.indexOf(afterRow);
        //delete first
        rows.splice(currentRowIndex, 1);
        // // // put it after
        rows.splice(afterRowIndex, 0, currentRow);
        // //
         this.setState({rows: rows});

    }
    render() {
    var {rows} = this.state;
    var self = this;
    return (
    <div className="container">
      <div className="row clearfix">
  		<div className="col-md-12 column">
        <table className="table table-striped table-bordered">
              <thead>
                <tr><td>#</td>
                  {
                    //Why use map forEach not work http://stackoverflow.com/questions/29534224/react-jsx-iterating-thought-an-hash-and-returning-jsx-elements-for-each-key
                    rows.map((r) =>
                        Object.keys(r.data).map((k) =>
                          <td>{k}</td>
                        )
                    )
                  }
                </tr>
              </thead>
              <tbody>
                {

                  rows.map((r,i) => <NWGridRow ref={r.key} key={r.key} serial={i} id={r.key} data={r.data} parent={this} moveRow={self.moveRow}/> )
                }
              </tbody>
            </table>
    </div>
  	</div>

      <button onClick={(e) => this.push({}) }>Add Row</button>
      <button onClick={(e) => this.pop() }>Delete Row</button>
      <button onClick={(e) => alert(JSON.stringify(this.getData()))}>Show data</button>
  </div>
  )
  }
}

export default DragDropContext(HTML5Backend)(NWGrid);
