import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/* React-vis */
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSerie, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LineSeries, Legends, VerticalBarSeries} from 'react-vis';

import BubbleChart from '@weknow/react-bubble-chart-d3';
import data from './assets/data.json';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      person: {name: "", data: [{x: 0, y: 8}]}

    }
    this.filterData = this.filterData.bind(this)
    this.cleanData = this.cleanData.bind(this)
    this.renderData = this.renderData.bind(this)
    this.selectPerson = this.selectPerson.bind(this)
  }


  componentWillMount() {
    this.cleanData()
  }

  componentDidMount(){
    this.renderData()
  }

  cleanData(){
    console.log(data);
    var cleanedData = [];
    data.map(person => cleanedData.push({ name: person["What is your first and last name?"],
    data: [{x: "Visualization", y: person["How would you rate your Information Visualization skills?"]},
      {x: "Statistics", y: person["How would you rate your statistical skills?"]},
      {x: "Math", y: person["How would you rate your mathematics skills?"]},
      {x: "Drawing", y: person["How would you rate your drawing and artistic skills?"]},
      {x: "Coding", y: person["How would you rate your programming skills?"]},
      {x: "UX", y: person["How would you rate your user experience evaluation skills?"]}]
  }))
     
     console.log(cleanedData)
     var options = cleanedData.map(person => <option key={person["name"]} value={person["name"]}>{person["name"]}</option>)
     console.log(options)
    this.setState({data: cleanedData, options: options, person: cleanedData[0]})
  }

  renderData(){
  
    var filteredArray = [];
    data.map(row => filteredArray.push({ x: "Programming skills", y: row[this.state.type] }))
    console.log(filteredArray);
    this.setState({ filterData: filteredArray })


  }

  selectPerson(person){
    var personList = this.state.data;
    for (var index = 0; index < personList.length; index++){
      if(person === personList[index]["name"]){
        console.log("Selected person: " + personList[index]["name"])
        this.setState({person: personList[index]})
        break;
      }
    }
  }


  checkType(type) {
    return
  }

  filterData(e){
    console.log(e.target.value)
    this.selectPerson(e.target.value)
    this.renderData()
  }

  render() {
    /*this.bubbleClick = (label) => {
      console.log("Custom bubble click func")
    }
    this.legendClick = (label) => {
      this.setState({ type: label })
      console.log(label);

      var newList = this.state.data.filter(data => data.label === label);
      this.setState({ data: newList });
    }
    */
    

    return (
      <div className="App">
        <header className="App-header">
          <h1>Visualize Student Groups</h1>
        </header>
        <div>
        <select onChange={this.filterData} value={this.state.person.name}>
          {this.state.options}
        </select>
        </div>
        <div className="container">
        <div className="row">
          <div className="col-6">
            <h1>Welcome</h1>  
            <p>With this visualization tools you can search and look up the skills of the persons who are taken the course this year.</p>
          </div>
        </div>
        </div>
<div className="container col-6">
 <XYPlot width={600} height={300} yDomain={[0, 10]}  xType="ordinal">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis  />
          <YAxis tickValues={[0,1,2,3,4,5,6,7,8,9,10]} />
          <VerticalBarSeries animation data={this.state.person["data"]} />
        </XYPlot>
        </div>

 


        {/*<BubbleChart


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
        */}
      </div>

    );
  }
}

export default App;
