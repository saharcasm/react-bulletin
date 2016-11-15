import React from 'react';
import './App.css';
// import './bootstrap.min.css';
// import './font-awesome.min.css';

import Note from './Note';


var Board= React.createClass({
  getInitialState(){
    return {
      notes: []
    }
  },
  nextId(){
    this.uniqueId=this.uniqueId || 0;
    return this.uniqueId++;
  },
  add(text){
    var notes=[
      ...this.state.notes,
      {
        id: this.nextId(),
        note: text
      }
    ];
    this.setState({notes: notes});
  },


  update(newText, id){
    var notes=this.state.notes.map(
        note => (note.id !== id) ? note : {...note, note: newText}
    );
    this.setState({notes: notes});

  },
  eachNote(n){
    return (
        <div className="col col-sm-4" key={n.id}>
          <Note id={n.id}
                onChange={this.update}
                onRemove={this.delete}>
            {n.note}
          </Note>
        </div>
    )
  },
  delete(id){
    var notes=this.state.notes.filter(note => note.id !== id);
    this.setState({notes: notes});
  },

  render(){
    return(
        <div className="board">
          <div className="well-custom">
            <h4>Total Notes: {this.state.notes.length}</h4>
            <button className="add-note-button btn btn-warning btn-lg" onClick={() => this.add("New Note")}>
              <i className="fa fa-plus-square-o"></i>
            </button>
          </div>
          <div className="row">
            {this.state.notes.map(this.eachNote)}
          </div>
        </div>
    )
  }
});





export default Board;
