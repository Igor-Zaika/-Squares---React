import { Component } from 'react';

import './app.scss';

class App extends Component{
    constructor(props) {
        super(props)
        this.state = {
            display: null,
            positionTop: 0,
            positionLeft: 0,
            activeColumn: null,
            activeRow: null,
            frameSquare: []
        }
    }

    componentDidMount() {
        let initialTable = [];
        for (let column = 0; column < this.props.initialHeight; column++) {
            let parentRow = [];

            for (let cell = 0; cell < this.props.initialHeight; cell++) {
                let cell = [];
                parentRow.push(cell)
            }
            initialTable.push(parentRow)
        }
        this.setState({frameSquare: initialTable})
    }

    createSquare = () => {
        let {frameSquare} = this.state;
        return frameSquare.map((column, columnIndex) => {
            return <div 
                        data-column={columnIndex} 
                        key={columnIndex}>
                        {
						column.map((_, cellIndex) => {
							return <div data-column={columnIndex}
										data-row={cellIndex}
										style={{width: this.props.cellSize, height: this.props.cellSize}}
                                        className="cell" 
										key={`row${columnIndex} cell${cellIndex}`}
										onMouseMove={(e) => this.movingButtons(e)}>	
							        </div>
						})
					}
                    </div>
        })
    }

    addColumn = () => {
        const {frameSquare} = this.state;
        const newFrameSquare = [...frameSquare, frameSquare[0]]
        this.setState({frameSquare: newFrameSquare})
    }

    addRow = () => {
        const {frameSquare} = this.state;
        const newFrameSquare = frameSquare.map(column => [...column,frameSquare[0]]);
        this.setState({frameSquare: newFrameSquare})
    }

    removeColumn = () => {
        const {frameSquare, activeColumn} = this.state;
        const newFrameSquare = [...frameSquare.slice(0, +activeColumn), ...frameSquare.slice(+activeColumn + 1 , frameSquare.length)]
        this.setState({frameSquare: newFrameSquare})
        this.hideButtons();
    }

    removeRow = () => {
        const {frameSquare, activeRow} = this.state;
        const newFrameSquare = frameSquare.map(column => {
                    return column.filter(row => (row !== column[activeRow] ? row : null))
                })
        this.setState({frameSquare: newFrameSquare})        
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
            positionLeft: e.target.offsetTop,
            activeColumn: e.target.getAttribute("data-column"),
            activeRow: e.target.getAttribute("data-row")
        }))
    }

    render() {
        const createdSquare = this.createSquare();
        const {frameSquare, display, positionTop, positionLeft} = this.state;
        const activeTop = display && frameSquare.length > 1 ? "removetop removetop_active" : "removetop";
        const activeLeft = display && frameSquare[0].length > 1 ? "removeleft removeleft_active" : "removeleft";
        
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
                    <div 
                        className="table" 
                        onMouseMove={this.showButtons}>
                        {createdSquare}
                    </div>
                <div className="addcolumn" onClick={this.addColumn}>+</div>
                <div className="addrow" onClick={this.addRow}>+</div>
            </div>
        );
    }

}

export default App;