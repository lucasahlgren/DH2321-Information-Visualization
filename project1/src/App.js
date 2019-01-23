import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import LabeledHeatmap from './test'
import ParalellCoordinatesPlot from './ParalellCoordinatesPlot'

/* React-vis */
import '../node_modules/react-vis/dist/style.css';
import { FlexibleXYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries } from 'react-vis';

/* RC-Slider */
import 'rc-slider/assets/index.css';
import { Range } from 'rc-slider';

import data from './assets/data.json';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      min: 0,
      max: 10,
      searchText: '',
      filteredPeople: [],
    }
    this.filterData = this.filterData.bind(this)
    this.cleanData = this.cleanData.bind(this)
    this.selectPerson = this.selectPerson.bind(this)
    this.changeSlider = this.changeSlider.bind(this)
    this.handleLabel = this.handleLabel.bind(this)
    this.filterPeople = this.filterPeople.bind(this)
    this.paraFilter = this.paraFilter.bind(this)
  }


  componentWillMount() {
    this.cleanData()
  }


  cleanData() {
    console.log(data);
    var cleanedDataBar = [];
    var cleanedDataPara = [];
    data.map(person => cleanedDataBar.push({
      name: person["What is your first and last name?"], interests: person["Please, tell me about yourself. What interest you? Do you have any hobbies?"],
      data: [{ x: "Visualization", y: person["How would you rate your Information Visualization skills?"], color: "#12939A" },
      { x: "Statistics", y: person["How would you rate your statistical skills?"], color: "#79C7E3" },
      { x: "Math", y: person["How would you rate your mathematics skills?"], color: "#A3177" },
      { x: "Drawing", y: person["How would you rate your drawing and artistic skills?"], color: "#FF9833" },
      { x: "Coding", y: person["How would you rate your programming skills?"], color: "#EF5D28" },
      { x: "UX", y: person["How would you rate your user experience evaluation skills?"], color: "#12939A" }]
    }))

    data.map(person => cleanedDataPara.push({
      name: person["What is your first and last name?"], interests: person["Please, tell me about yourself. What interest you? Do you have any hobbies?"],
      visualization: person["How would you rate your Information Visualization skills?"],
      statistics: person["How would you rate your statistical skills?"],
      math: person["How would you rate your mathematics skills?"],
      drawing: person["How would you rate your drawing and artistic skills?"],
      coding: person["How would you rate your programming skills?"],
      ux: person["How would you rate your user experience evaluation skills?"]
    }))



    console.log(cleanedDataBar)
    console.log(cleanedDataPara)
    var options = cleanedDataBar.map(person => <option key={person["name"]} value={person["name"]}>{person["name"]}</option>)
    console.log(options)
    var labels = cleanedDataBar[0]["data"].map(label => <option key={label["x"]} value={label["x"]}>{label["x"]}</option>)
    var itemsList = [];
    cleanedDataBar[0]["data"].map(label => itemsList.push({ title: label["x"] }))
    console.log(labels)
    console.log(itemsList[0].title)
    this.setState({ cleanedDataPara: <ParalellCoordinatesPlot filter={this.paraFilter} data={cleanedDataPara} />, filteredPeople: cleanedDataPara, labelComp: <LabeledHeatmap data={cleanedDataBar}></LabeledHeatmap>, data: cleanedDataBar, options: options, person: cleanedDataBar[0], labels: labels, label: itemsList[0].title })
  }

  /* Filter people by slider */

  filterPeople(skill) {
    var filteredList = [];
    var allPeople = this.state.data;
    var min = this.state.min;
    var max = this.state.max;
    console.log("Label filter: " + this.state.label)
    console.log("All people: " + JSON.stringify(allPeople[0]["data"][0]["x"]))
    filteredList = allPeople.filter(people => people["data"][0]["x"] === skill && people["data"][0]["y"] >= min)
    console.log(filteredList);
    this.setState({ filteredPeople: filteredList })

  }


  paraFilter(list) {
    console.log(list)
    this.setState({ filteredPeople: list })
  }


  /* Slider value and type */
  handleLabel(event) {
    var label = event.target.value;
    console.log(label)
    this.setState({ label: label })
    this.filterPeople(label)
  }

  changeSlider(event) {
    console.log("Slider: " + event)
    console.log(event)
    var min = event[0]
    var max = event[1]
    this.setState({ min: min, max: max })
    var label = this.state.label
    this.filterPeople(label)
  }


  /* Select person filter */

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

  filterData(e) {
    console.log(e.target.value)
    this.selectPerson(e.target.value)
  }


  render() {
    var filteredPeople = this.state.filteredPeople.map(people => <li key={people.name} name={people.name} onClick={e => this.selectPerson(e.target.getAttribute("name"))} className="btn">{people.name}</li>)
    var wrapperFilteredPeople = <ul>{filteredPeople}</ul>


    return (
      <div className="App" >
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
          </div>
        </div>
        <div className="Test2">
                {this.state.cleanedDataPara}
              </div>
        <div className="container pt-3 pb-3">
          
          <div className="row p-3">
            <div className="col-12 col-md-6">
              <div className="row">
              <div className="col-10 mx-auto">
            <h4 className="text-center">Students</h4>  <br/>
            </div>
            {/*
                <select className="mx-auto mb-3" onChange={this.handleLabel} value={this.state.label}>
                  {this.state.labels}
                </select>
                <Range className="slider" defaultValue={[0, 10]} marks={{ 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10 }} min={0} max={10} onChange={this.changeSlider} />
                 */}
                </div>
         
              <div className="row pt-5">
                {wrapperFilteredPeople}
              </div>
            </div>

            <div className="col-12 col-md-6 chart">
            <div className="row">
            <div className="col-10 mx-auto">
            <h4 className="text-center">Personal information</h4>  <br/>
            </div>
            </div>
            <div className="row mx-auto">
            <div className="col-12">
            <select onChange={this.filterData} value={this.state.person.name}>
              {this.state.options}
            </select>
            </div>
            
          </div>
              <FlexibleXYPlot yDomain={[0, 10]} xType="ordinal" animation >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                <VerticalBarSeries colorType="literal" data={this.state.person["data"]} />
              </FlexibleXYPlot >
              <h4>Interests</h4>
              <p>{this.state.person["interests"]}</p>
            </div>
          </div>
        </div>
        <footer className="App-footer">
          <p><strong>&copy; Lucas Ahlgren 2019 | Project 1 DH2321 VT19-1 Information Visualization</strong></p>
        </footer>
      </div>

    );
  }
}

export default App;
