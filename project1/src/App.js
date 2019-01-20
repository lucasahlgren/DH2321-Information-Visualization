import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

/* React-vis */
import '../node_modules/react-vis/dist/style.css';
import { FlexibleXYPlot, LineSerie, SearchableDiscreteColorLegend, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LineSeries, Legends, VerticalBarSeries } from 'react-vis';



/* RC-Slider */
import 'rc-slider/assets/index.css';
import Slider, { Range } from 'rc-slider';

import BubbleChart from '@weknow/react-bubble-chart-d3';
import data from './assets/data.json';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      min: 0,
      max: 10,
      items: [
        { title: 'Apples' },
        { title: 'Bananas', color: '#fc0' },
        { title: 'Blueberries', color: '#337' },
        { title: 'Carrots', color: '#f93' },
        { title: 'Eggplants', color: '#337' },
        { title: 'Limes', color: '#cf3' },
        { title: 'Potatoes', color: '#766' }
      ],
      searchText: ''

    }
    this.filterData = this.filterData.bind(this)
    this.cleanData = this.cleanData.bind(this)
    this.renderData = this.renderData.bind(this)
    this.selectPerson = this.selectPerson.bind(this)
    this.changeSlider = this.changeSlider.bind(this)
    this.handleLabel = this.handleLabel.bind(this)
  }


  componentWillMount() {
    this.cleanData()
  }

  componentDidMount() {
    this.renderData()
  }

  cleanData() {
    console.log(data);
    var cleanedData = [];
    data.map(person => cleanedData.push({
      name: person["What is your first and last name?"], interests: person["Please, tell me about yourself. What interest you? Do you have any hobbies?"],
      data: [{ x: "Visualization", y: person["How would you rate your Information Visualization skills?"], color: "#12939A" },
      { x: "Statistics", y: person["How would you rate your statistical skills?"], color: "#79C7E3" },
      { x: "Math", y: person["How would you rate your mathematics skills?"], color: "#A3177" },
      { x: "Drawing", y: person["How would you rate your drawing and artistic skills?"], color: "#FF9833" },
      { x: "Coding", y: person["How would you rate your programming skills?"], color: "#EF5D28" },
      { x: "UX", y: person["How would you rate your user experience evaluation skills?"], color: "#12939A" }]
    }))

    console.log(cleanedData)
    var options = cleanedData.map(person => <option key={person["name"]} value={person["name"]}>{person["name"]}</option>)
    console.log(options)
    var labels = cleanedData[0]["data"].map(label => <option key={label["x"]} value={label["x"]}>{label["x"]}</option>)
    var itemsList = [];
    cleanedData[0]["data"].map(label => itemsList.push({ title: label["x"] }))
    console.log(labels)
    this.setState({ data: cleanedData, options: options, person: cleanedData[0], labels: labels, items: itemsList })
  }

  renderData() {

    var filteredArray = [];
    data.map(row => filteredArray.push({ x: "Programming skills", y: row[this.state.type] }))
    console.log(filteredArray);
    this.setState({ filterData: filteredArray })


  }

  selectPerson(person) {
    var personList = this.state.data;
    for (var index = 0; index < personList.length; index++) {
      if (person === personList[index]["name"]) {
        console.log("Selected person: " + personList[index]["name"])
        this.setState({ person: personList[index] })
        break;
      }
    }
  }


  filerPeople() {

    var allPeople = this.state.data;

  }

  handleLabel(event) {
    var label = event.target.value;
    this.setState({ label: label })
  }

  changeSlider(event) {
    console.log("SLider: " + event)
    console.log(event)
    var min = event[0]
    var max = event[1]
    this.setState({ min: min, max: max })
  }

  checkType(type) {
    return
  }

  filterData(e) {
    console.log(e.target.value)
    this.selectPerson(e.target.value)
    this.renderData()
  }


  _clickHandler = item => {
    const { items } = this.state;
    item.disabled = !item.disabled;
    console.log(items)
    this.setState({ items });
  };

  _searchChangeHandler = searchText => {
    this.setState({ searchText });
  };




  render() {
    const { items, searchText } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h2>Visualize Student Groups</h2>
        </header>
        <div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 p-3">
              <h3>Welcome</h3>
              <p>This is a visualization tool where you can search and look up the skills of the persons who are taking the course this year.</p>
            </div>
            <div className="row mx-auto">
            <select onChange={this.filterData} value={this.state.person.name}>
              {this.state.options}
            </select>
            </div>
          </div>
        </div>
        <div className="container">
        <div className="row p-3">
          <div className="col-6">
          <div className="row">
          <select className="mx-auto mb-3" onChange={this.handleLabel} value={this.state.label}>
              {this.state.labels}
            </select>
            <Range className="slider" defaultValue={[0, 10]} marks={{ 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10 }} min={0} max={10} onChange={this.changeSlider} />
            </div>
            <div className="row pt-5">
            <SearchableDiscreteColorLegend
              height={300}
              width={200}
              onSearchChange={this._searchChangeHandler}
              searchText={searchText}
              onItemClick={this._clickHandler}
              items={items}
            />
            </div>
          </div>
          <div className="col-12 col-md-6 chart">
            <FlexibleXYPlot yDomain={[0, 10]} xType="ordinal" >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
              <VerticalBarSeries colorType="literal" animation data={this.state.person["data"]} />
            </FlexibleXYPlot >

            <h4>Interests</h4>
            <p>{this.state.person["interests"]}</p>
          </div>
        </div>
        </div>
      </div>

    );
  }
}

export default App;
