import React from 'react'
import $ from 'jquery'
import ui from 'jquery-ui/draggable'

class Note extends React.Component{

    constructor() {
        super();
        this.state = {
            editing: false
        };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.render = this.render.bind(this);
    }

    componentWillMount() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150, 'px'),
            top: this.randomBetween(0, window.innerHeight - 150, 'px'),
            transform: 'rotate(' + this.randomBetween(-15, 15, 'deg') + ')'
        };
    }

    componentDidMount() {
        $(React.findDOMNode(this)).draggable();
    }

    componentDidUpdate() {
        var textArea;
        if (this.state.editing) {
            textArea = this.refs.newText.getDOMNode();
            textArea.focus();
            textArea.select();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.children !== nextProps.children || this.state !== nextState;
    }

    randomBetween(x, y, s) {
        return ((x + Math.ceil(Math.random() * y)) - 1) + s;
    }

    edit() {
        this.setState({editing: true});
    }

    save() {
        this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
        this.setState({editing: false});
    }

    remove() {
        this.props.onRemove(this.props.index);
    }

    renderForm() {
        return (
            <div className="note"
                 style={this.style}>
                <textarea ref="newText"
                          defaultValue={this.props.children}
                          className="form-control"></textarea>
                <button onClick={this.save}
                        className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
        );
    }

    renderDisplay() {
        return (
            <div className="note"
                 style={this.style}
                 onDoubleClick={this.edit}>

                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}
                            className="btn btn-primary btn-sm glyphicon glyphicon-pencil" />
                    <button onClick={this.remove}
                            className="btn btn-danger btn-sm glyphicon glyphicon-trash" />
                </span>
            </div>
        );
    }

    render() {
        return (this.state.editing) ? this.renderForm() : this.renderDisplay();
    }

}

Note.propTypes = {
    index: React.PropTypes.number
};

Note.defaultProps = {
    index: -1
};

module.exports = Note;