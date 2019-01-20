import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/* React-vis */
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis';

import BubbleChart from '@weknow/react-bubble-chart-d3';
import data from './assets/data.json';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "How would you rate your programming skills?",
    }
    this.filterData = this.filterData.bind(this)
    this.renderData = this.renderData.bind(this)
  }


  componentWillMount() {
    this.renderData()
  }

  renderData(){
    console.log(data);
    var filteredArray = [];
    data.map(row => filteredArray.push({ label: row["What is your first and last name?"], value: row[this.state.type] }))

    console.log(filteredArray);
    this.setState({ data: filteredArray })
  }


  checkType(type) {
    return
  }

  filterData(e){
    console.log(e.target.value)
    this.setState({type: e.target.value})
    this.renderData()
  }

  render() {
    this.bubbleClick = (label) => {
      console.log("Custom bubble click func")
    }
    this.legendClick = (label) => {
      this.setState({ type: label })
      console.log(label);

      var newList = this.state.data.filter(data => data.label === label);
      this.setState({ data: newList });
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1>Visualize Student Group </h1>
        </header>
        <div>
        <select onChange={this.filterData} value={this.state.type}>
          <option value="How would you rate your programming skills?">Programming skills</option>
          <option value="How would you rate your mathematics skills?">Mathematics skills</option>
          <option value="How would you rate your human-computer interaction programming skills?">Interaction programming skills</option>
          <option value="How would you rate your drawing and artistic skills?">Drawing and artistic skills</option>
        </select>
        </div>
        <BubbleChart


          width={1400}
          height={1500}
          showLegend={true} // optional value, pass false to disable the legend.
          legendPercentage={10} // number that represent the % of with that legend going to use.
          legendFont={{
            family: 'Arial',
            size: 12,
            color: '#000',
            weight: 'bold',
          }}
          valueFont={{
            family: 'Arial',
            size: 12,
            color: '#fff',
            weight: 'bold',
          }}
          labelFont={{
            family: 'Arial',
            size: 10,
            color: '#fff',
            weight: 'bold',
          }}
          //Custom bubble/legend click functions such as searching using the label, redirecting to other page
          bubbleClickFunc={this.bubbleClick}
          legendClickFun={this.legendClick}
          data={this.state.data}
        />

      </div>

    );
  }
}

export default App;
