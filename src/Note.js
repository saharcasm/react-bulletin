import React from 'react';
import './App.css';
// import './bootstrap.min.css';
// import './font-awesome.min.css';

var Note=React.createClass({
    getInitialState(){
        return{
            editing: false,
            backgroundColor: '#8a7345'
        }
    },
    changeEditingState(){
        this.setState({editing: !this.state.editing});
    },
    componentDidUpdate(){
        if(this.state.editing){
            this.refs.newText.focus();
            this.refs.newText.select();
        }
    },
    shouldComponentUpdate(nextProps, nextState){
        return this.props.children!==nextProps.children || this.state!==nextState;
    },
    edit(){
        this.changeEditingState();

    },
    remove(){
        this.props.onRemove(this.props.id);
    },

    save(){
        var newText=this.refs.newText.value;
        this.props.onChange(newText, this.props.id);
        this.changeEditingState();
        this.setState({backgroundColor: "darkcyan"});
    },
    renderForm(){
        return (
            <div className="note note-edit">
                <div className="note-form">
                    <textarea ref="newText" defaultValue={this.props.children}></textarea>
                    <br/>
                    <button className="btn btn-success" onClick={this.save}><i className="fa fa-file-text-o"></i></button>
                </div>
            </div>
        )
    },
    renderNote(){
        return(
            <div className="note" style={this.state}>
                <p>{this.props.children}</p>
                <span className="btn btn-group btn-group-sm">
                   <button className="btn btn-info" onClick={this.edit}>
                       <i className="fa fa-pencil-square-o"></i>
                   </button>
                   <button className="btn btn-danger" onClick={this.remove}>
                       <i className="fa fa-times"></i>
                   </button>
               </span>

            </div>
        )
    },
    render(){
        return this.state.editing ? this.renderForm() : this.renderNote();
    }
});

export default Note;