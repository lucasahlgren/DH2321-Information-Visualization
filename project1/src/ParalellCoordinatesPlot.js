import React, { Component } from 'react';
import './d3.parcoords.css';

import { ParallelCoordinates } from 'react-parcoords';

class ParalellCoordinatesPlot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: ['rgb(150,20,20)'],
            height: 200,
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
                design: {
                    title: 'Design',
                    type: 'number'
                },
                coding: {
                    title: 'Coding',
                    type: 'number'
                },
                ux: {
                    title: 'UX',
                    type: 'number'
                },
            },
            data: this.props.data,
            highlights: [],
            highlightIdx: 0
        };
        this.reset = this.reset.bind(this)
    }


    reset() {
        this.setState({ color: ['rgb(150,20,20)'] });
        this.props.reset()
    }


    componentDidMount() {

        /* Responsive plot */
        this.setState({ width: window.innerWidth - (window.innerWidth * 0.2), paddingleft: (window.innerWidth * 0.1) })

        /* Eventlistener responsive when resizing */
        window.addEventListener("resize", () => {
            console.log("resized!")
            console.log(window.innerHeight)
            console.log(window.innerWidth)
            this.props.reset()
            this.setState({ width: window.innerWidth - (window.innerWidth * 0.2), paddingleft: (window.innerWidth * 0.1) })
        })
    }


    render() {
        console.log(this.props.data)
        return (
            <div className="container-fluid card">
                <div className="row">
                    <div className="col-12 appHeader">
                        <h2 className="p-3">Visualize student groups</h2>
                    </div>
                    <div className="row mx-auto">
                        <div className="col-12 mx-auto p-2">
                            <button className="btn-danger btn" onClick={this.reset}>Reset</button>
                        </div>

                    </div>
                </div>
                <div className="pt-3 pb-3" style={{ paddingLeft: this.state.paddingleft }}>
                    <ParallelCoordinates
                        width={this.state.width}
                        height={this.state.height}
                        dimensions={this.state.dimensions}
                        data={this.state.data}
                        color={this.state.color}
                        highlights={this.state.highlights}
                        onBrush={d => this.props.filter(d.data)}
                    />
                </div>
            </div>
        );
    }
}

export default ParalellCoordinatesPlot;
