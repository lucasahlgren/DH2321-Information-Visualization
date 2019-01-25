import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import LabeledHeatmap from './test'
import ParalellCoordinatesPlot from './ParalellCoordinatesPlot'

/* React-vis */
import '../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries } from 'react-vis';

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
    this.filterPeople = this.filterPeople.bind(this)
    this.paraFilter = this.paraFilter.bind(this)
    this.resetFilteredData = this.resetFilteredData.bind(this)
  }


  componentWillMount() {
    this.cleanData()
     /* Responsive plot */
    this.setState({width: window.innerWidth - (window.innerWidth * 0.7)})
  }

  componentDidMount(){
    /* Eventlistener responsive when resizing */
    window.addEventListener("resize", () => {
        console.log("resized!")
        console.log(window.innerHeight)
        console.log(window.innerWidth)
        console.log("Width calc: " + this.state.width)
        if(window.innerWidth < 768){
        this.setState({width: window.innerWidth - (window.innerWidth * 0.3)})
      }
      else{
        this.setState({width: window.innerWidth - (window.innerWidth * 0.7)})
      }
    })
}


  cleanData() {
    console.log(data);
    var cleanedDataBar = [];
    var cleanedDataPara = [];
    data.map(person => cleanedDataBar.push({
      name: person["What is your first and last name?"], 
      interests: person["Please, tell me about yourself. What interest you? Do you have any hobbies?"],
      major: person["What is your Major?"],
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
      ux: person["How would you rate your user experience evaluation skills?"],
      major: person["What is your Major?"]
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
    this.setState({ cleanedDataPara: cleanedDataPara, cleanedDataParaComp: <ParalellCoordinatesPlot reset={this.resetFilteredData} filter={this.paraFilter} data={cleanedDataPara} />, filteredPeople: cleanedDataPara, data: cleanedDataBar, options: options, person: cleanedDataBar[0], labels: labels, label: itemsList[0].title })
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

  resetFilteredData(){
    console.log(this.state.cleanedDataPara)
    this.setState({filteredPeople: this.state.cleanedDataPara})
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
    var filteredPeople = this.state.filteredPeople.map(people => <li key={people.name} className="col-12 text-center" name={people.name} onClick={e => this.selectPerson(e.target.getAttribute("name"))} >{people.name}</li>)
    var wrapperFilteredPeople = <ul className="studentList mx-auto">{filteredPeople}</ul>

    return (
      <div className="app">
        <div className="parallelCoordinatesPlot">
                {this.state.cleanedDataParaComp}
        </div>
        <div className="container-fluid pt-3 pb-3">
          <div className="row p-3 mx-auto">
            <div className="col-12 col-md-4">
              <div className="col-10 mx-auto">
            <h4 className="text-center pb-2">Students</h4>
            </div>
              <div className="height">
              <div className="col-12 mx-auto">
                {wrapperFilteredPeople}
              </div>
              </div>
            </div>
            <div className="col-12 col-md-7">
            <div className="mx-auto">  
            <h4 className="text-center pb-2">Personal information</h4>
            <div className="col-12">
            <select onChange={this.filterData} value={this.state.person.name}>
              {this.state.options}
            </select>
            </div>
          </div>
          <div className="row pt-4">
                 <div className="col-md-7 p-md-0 pb-3">
                  <h4>Skills</h4>
              <XYPlot height={300} width={this.state.width} yDomain={[0, 10]} xType="ordinal" animation >
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
                <VerticalBarSeries colorType="literal" data={this.state.person["data"]} />
              </XYPlot >
              </div>
              <div className="col-md-5">
              <h4 className="text-center">Major</h4>
              <p>{this.state.person["major"]}</p>
              <br/>
              <h4 className="text-center">Interests</h4>
              <p>{this.state.person["interests"]}</p>
                 </div>
                 </div>
            </div>
          </div>
        </div>
        <div className="container-fluid p-0">
          <footer className="appFooter p-3 m-0">
          <p><strong>&copy; Lucas Ahlgren 2019 | Project 1 DH2321 VT19-1 Information Visualization</strong></p>
        </footer>
        </div> 
      </div>
    );
  }
}

export default App;
