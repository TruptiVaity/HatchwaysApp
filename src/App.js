import './App.css';
import Student from './Student'
import React from 'react';


class App extends React.Component {

  constructor(){
    super()

    this.state = {
      loading: false,
      student: [],
      searchTerm: '',
    }

  }
  componentDidMount(){
    fetch("https://api.hatchways.io/assessment/students")
      .then(response => response.json())
      .then(({students}) => {
        this.setState({
          isLoaded: true,
          items: students,
          searchTerm: '',
        })
      })
  }
  
    
  render(){

    //Display loading if the data is not loading yet
    const {isLoaded, items} = this.state;
    if(!isLoaded){ return <div>Loading Data...</div> }

    const filteredStudents = items.filter(item =>{
      return item.firstName.toLowerCase().includes(this.state.searchTerm.toLowerCase)
    })
    // const studentComponents = students.map(item => <Student key = {item.id} student = {item} />) 
    //searchTerm is the text written in the input box
    const studentComponents = items.filter((item) => {
      if(this.state.searchTerm === ''){ 
        // console.log('without filter')
        // console.log(this.state.searchTerm)
        return item;
        
      } else if(item.firstName.toLowerCase().startsWith(this.state.searchTerm.toLowerCase()) || item.lastName.toLowerCase().startsWith(this.state.searchTerm.toLowerCase())){
        // console.log('filtered')
        // console.log(this.state.searchTerm)
        return item;    
      }
    }).map(item=>(<Student key={item.id} student = {item} />));

    return (
      <div className="Outer">
      <div>
        <input 
          placeholder="Search by name" type="text" className="textInput" 
          onChange={event => {this.setState({searchTerm: event.target.value})}} 
        />
      </div>
      
        {studentComponents}
      
      </div>
      
      
    );
  }  
}

export default App;
