import { Component } from 'react';

import './createSquare.scss';

class CreateSquare extends Component {
    constructor(props) {
        super()

    }

    createRow = () => {
        let parentCell = [];
        for (let row = 0; row < this.props.initialHeight; row++) {
            parentCell.push(
                <div 
                    style={{width: this.props.cellSize, height: this.props.cellSize}}
                    className="cell" 
                    onMouseMove={(e) => this.props.movingButtons(e)}
                    key={row}></div>
            )
        }
        
        return (
            <>
                {parentCell}
            </>
        );
    }

    createColumn = () => {
        let table = [];
        for (let column = 0; column < this.props.initialWidth; column++) {
            table.push(
                <div 
                    className='column'
                    
                    onMouseOut={(e) => this.removeActiveColumn(e)}
                    onMouseOver={(e) => this.addActiveColumn(e)}
                    key={column}>
                    {this.createRow()}
                </div>
            );
        }
        
        return table;
    }

    addActiveColumn = (e) => {
        e.target.parentElement.className = 'column__active'
    }

    removeActiveColumn = (e) => {
        e.target.parentElement.className = 'column'
    }

    render() {
        return (
            <div 
                className="table" 
                onMouseMove={this.props.mouseMove}>
                {this.createColumn()}
            </div>
        );
    }
} 


export default CreateSquare;
