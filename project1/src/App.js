import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ParalellCoordinatesPlot from './ParalellCoordinatesPlot'

/* React-vis */
import '../node_modules/react-vis/dist/style.css';
import { XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries } from 'react-vis';

import data from './assets/data.json';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      min: 0,
      max: 10,
      searchText: '',
      filteredPeople: [],
      searchPeople: [],
      filter: false,
      search: false,
    }
    this.filterData = this.filterData.bind(this)
    this.cleanData = this.cleanData.bind(this)
    this.selectPerson = this.selectPerson.bind(this)
    this.searchPeople = this.searchPeople.bind(this)
    this.paraFilter = this.paraFilter.bind(this)
    this.resetFilteredData = this.resetFilteredData.bind(this)
    this.searchData = this.searchData.bind(this)
  }


  componentWillMount() {
    this.cleanData()
    /* Responsive plot */
    this.setState({ width: window.innerWidth - (window.innerWidth * 0.73) })
  }

  componentDidMount() {
    /* Eventlistener responsive when resizing */
    window.addEventListener("resize", () => {
      console.log("resized!")
      console.log(window.innerHeight)
      console.log(window.innerWidth)
      console.log("Width calc: " + this.state.width)
      if (window.innerWidth < 768) {
        this.setState({ width: window.innerWidth - (window.innerWidth * 0.27) })
      }
      else {
        this.setState({ width: window.innerWidth - (window.innerWidth * 0.73) })
      }
    })
    window.addEventListener("load", () => {
      console.log("load!")
      console.log(window.innerHeight)
      console.log(window.innerWidth)
      console.log("Width calc: " + this.state.width)
      if (window.innerWidth < 768) {
        this.setState({ width: window.innerWidth - (window.innerWidth * 0.27) })
      }
      else {
        this.setState({ width: window.innerWidth - (window.innerWidth * 0.73) })
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
      { x: "Design", y: person["How would you rate your drawing and artistic skills?"], color: "#FF9833" },
      { x: "Coding", y: person["How would you rate your programming skills?"], color: "#EF5D28" },
      { x: "UX", y: person["How would you rate your user experience evaluation skills?"], color: "#12939A" }]
    }))

    data.map(person => cleanedDataPara.push({
      name: person["What is your first and last name?"], interests: person["Please, tell me about yourself. What interest you? Do you have any hobbies?"],
      visualization: person["How would you rate your Information Visualization skills?"],
      statistics: person["How would you rate your statistical skills?"],
      math: person["How would you rate your mathematics skills?"],
      design: person["How would you rate your drawing and artistic skills?"],
      coding: person["How would you rate your programming skills?"],
      ux: person["How would you rate your user experience evaluation skills?"],
      major: person["What is your Major?"]
    }))
    console.log(cleanedDataBar)
    console.log(cleanedDataPara)
    var options = cleanedDataBar.map(person => <option key={person["name"]} value={person["name"]}>{person["name"]}</option>)
    console.log(options)
    this.setState({ cleanedDataPara: cleanedDataPara, data: cleanedDataBar, options: options, person: cleanedDataBar[0]})
  }

  /* Filter people by slider */

  searchPeople(input) {
    var text = input.toLowerCase()
    var filteredList = [];
    var students = this.state.filteredPeople.length >= 0 && this.state.filter ? this.state.filteredPeople : this.state.cleanedDataPara
    console.log("All people: " + students.length)
    filteredList = students.filter(people => people["name"].toLowerCase().search(text) !== -1 || people["interests"].toLowerCase().search(text) !== -1 || people["major"].toLowerCase().search(text) !== -1)
    console.log(filteredList);
    console.log("Search text: " + input)
    this.setState({ searchPeople: filteredList, search: true })
  }

  paraFilter(list) {
    console.log(list)
    this.setState({ filteredPeople: list, filter: true })
    this.searchPeople(this.state.searchText)
  }

  resetFilteredData() {
    console.log(this.state.cleanedDataPara)
    this.setState({ filteredPeople: [], searchPeople: [], filter: false, search: false, searchText: "" })
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

  searchData(e) {
    var text = e.target.value
    console.log(text)
    this.setState({ searchText: text })
    this.searchPeople(text)
  }


  filterData(e) {
    var person = e.target.value
    console.log(person)
    this.selectPerson(person)
  }

  render() {

    var filteredPeople = this.state.filteredPeople
    var cleanedDataPara = this.state.cleanedDataPara
    var searchPeople = this.state.searchPeople
    this.results = [];

    if ((filteredPeople.length === 0 && !this.state.filter) && (searchPeople.length >= 0 && !this.state.search)) {
      this.results = cleanedDataPara
      console.log("Start list")
      this.numberFilteredPeople = cleanedDataPara.length
    }
    else if ((filteredPeople.length >= 0 && this.state.filter) && (searchPeople.length >= 0 && !this.state.search)) {
      this.results = filteredPeople
      console.log("Filtered list")
      this.numberFilteredPeople = filteredPeople.length
    }
    else if (searchPeople.length >= 0) {
      this.results = searchPeople
      console.log("Searched list")
      this.numberFilteredPeople = searchPeople.length
    }

  
      var paralellPlot = <ParalellCoordinatesPlot reset={this.resetFilteredData} filter={this.paraFilter} data={cleanedDataPara} />
   

    var filteredPeopleTag = this.results.map(people => <li key={people.name} className="text-center" name={people.name} onClick={e => this.selectPerson(e.target.getAttribute("name"))} >{people.name}</li>)
    var wrapperFilteredPeople = <ul className="studentList mx-auto">{filteredPeopleTag}</ul>



    return (
      <div className="app">
        <div className="parallelCoordinatesPlot">
          {paralellPlot}
        </div>
        <div className="container-fluid pt-3 pb-3">
          <div className="row col-md-11 mx-auto p-3">
            <div className="col-md-5 col-lg-4 pb-md-0 pb-2 mx-auto">
              <div className="col-10 mx-auto">
                <h4 className="text-center pb-2">Students<span className="badge custom-badge badge-color ml-2">{this.numberFilteredPeople}</span></h4>
                <input className="mb-2" type="text" value={this.state.searchText} onChange={this.searchData} placeholder="Search..." />
              </div>
              <div className="height">
                <div className="mx-auto">
                  {wrapperFilteredPeople}
                </div>
              </div>
            </div>
            <div className="col-md-7 card p-4 mx-auto">
              <div className="mx-auto">
                <h4 className="text-center pb-2">Student information</h4>
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
                  <br />
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
