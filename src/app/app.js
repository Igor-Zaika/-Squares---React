import { Component } from 'react';

import CreateSquare from '../component/createSquare/CreateSquare';

import './app.scss';

class App extends Component{
    constructor(props) {
        super(props)

        this.state = {
            initialWidth: 4,
            initialHeight: 4,
            cellSize: 50,
            display: null,
            positionTop: 0,
            positionLeft: 0,
        }
        
    }

    addColumn = () => {
        this.setState(state => ({
            initialWidth: state.initialWidth + 1
        }))
    }

    addRow = () => {
        this.setState(state => ({
            initialHeight: state.initialHeight + 1
        }))
    }

    removeColumn = () => {
        this.setState(state => ({
            initialWidth: state.initialWidth - 1
        }))
        this.hideButtons();
    }

    removeRow = () => {
        this.setState(state => ({
            initialHeight: state.initialHeight - 1
        }))
        this.hideButtons();
    }

    hideButtons = () => {
        this.setState(({
            display: null
        }))
    }

    showButtons = () => {
        this.setState(({
            display: 'flex'
        }))
    }

    movingButtons = (e) => {
        this.setState(({
            positionTop: e.target.offsetLeft,
            positionLeft: e.target.offsetTop
        }))
    }

    
    render() {
        const {initialWidth, initialHeight, cellSize, display, positionTop, positionLeft} = this.state;
        const activeTop = display && initialWidth > 1 ? "removetop removetop__active" : "removetop";
        const activeLeft = display && initialHeight > 1 ? "removeleft removeleft__active" : "removeleft";

        return (
            <div 
                className="container" 
                onMouseLeave={this.hideButtons}>
                <div 
                    className= {activeTop} 
                    onClick={this.removeColumn}
                    style={{left: positionTop}}>-</div>
                <div 
                    className={activeLeft} 
                    onClick={this.removeRow}
                    style={{top: positionLeft}}>-</div>
                    <CreateSquare
                        movingButtons={this.movingButtons}
                        mouseMove={this.showButtons}
                        initialWidth={initialWidth} 
                        initialHeight={initialHeight} 
                        cellSize={cellSize}/>
                <div className="addcolumn" onClick={this.addColumn}>+</div>
                <div className="addrow" onClick={this.addRow}>+</div>
            </div>
        );
    }

}

export default App;