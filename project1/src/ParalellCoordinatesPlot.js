import React, {Component} from 'react';
import data from './data';
import './d3.parcoords.css';

import {ParallelCoordinates} from 'react-parcoords';

class ParalellCoordinatesPlot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: ['rgb(150,20,20)'],
            height: 300,
            dummy: false,
            
            dimensions: {
                visualization: {
                    title: 'Visualization',
                    type: 'number'
                },
                statistics: {
                    title: 'Statistics',
                    type: 'number'
                },
                math: {
                    title: 'Math',
                    type: 'number'
                },
                drawing: {
                    title: 'Drawing',
                    type: 'number'
                },
                coding: {
                    title: 'Coding',
                    type: 'number'
                },
                ux:{
                    title: 'UX',
                    type: 'number'
                },
            },
            data: this.props.data,
            highlights: [],
            highlightIdx: 0
        };
    }

    componentDidMount(){

        /* Responsive plot */
        this.setState({width: window.innerWidth - (window.innerWidth * 0.2), paddingleft: (window.innerWidth * 0.1)})

        /* Eventlistener responsive when resizing */
        window.addEventListener("resize", () => {
            console.log("resized!")
            console.log(window.innerHeight)
            console.log(window.innerWidth)
            this.setState({width: window.innerWidth - (window.innerWidth * 0.2), paddingleft: (window.innerWidth * 0.1)})
        })
    }
    

    render() {
        console.log(this.props.data)
        console.log(data.data)
        return (
            <div style={{paddingLeft: this.state.paddingleft}}>
                <ParallelCoordinates
                    width={this.state.width}
                    height={this.state.height}
                    dimensions={this.state.dimensions}
                    data={this.state.data}
                    color={this.state.color}
                    highlights={this.state.highlights}
                    onBrush={d => this.props.filter(d.data)}
                    onBrushEnd={d => console.log(d.data)}
                    onLineHover={d => console.log('line hover', d)}
                    onLinesHover={lines => console.log('lines hover', lines)}
                />
            </div>
        );
    }
}

export default ParalellCoordinatesPlot;
