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
      searchTag: '',
      
    }

    this.handleChange = this.handleChange.bind(this)
    this.getBySearchTerm = this.getBySearchTerm.bind(this)
  }
  componentDidMount(){
    fetch("https://api.hatchways.io/assessment/students")
      .then(response => response.json())
      .then(({students}) => {
        this.setState({
          isLoaded: true,
          allStudents: students,
          searchTerm: '',
          searchTag: '',
        })
        
      })
      localStorage.clear()
  }
  
  handleChange(id){
    this.setState(prevState => {
      const updatedView = prevState.allStudents.map(item => {
        if(item.id === id){
          return{
            ...item,
            expanded: !item.expanded
          }
        }
        return item
      })
      return{
        allStudents: updatedView
      }
    })
  }

  getBySearchTerm(event){
    this.setState({
      searchTerm: event.target.value
    })

  }

  renderStudentList(students){
    
    return students && students.map(item=>(<Student 
      key={item.id} 
      student = {item}
      handleChange = {this.handleChange}
      />))
  }

  getFilteredStudents(allStudents){
    let parseTags = [];
    
    return allStudents && allStudents.filter((student) => {

      if(this.state.searchTerm === '' && this.state.searchTag === ''){ 
        return student;
        
      } else if (this.state.searchTerm === '' && this.state.searchTag !== "")
        {
          return this.getFilteredByTag(student)
        }
        else if(this.state.searchTag === "" && 
        (student.firstName.toLowerCase().startsWith(this.state.searchTerm.toLowerCase()) || 
        student.lastName.toLowerCase().startsWith(this.state.searchTerm.toLowerCase())))
        {
            return student;    
        }
        else if(this.state.searchTag !== "" && 
        (student.firstName.toLowerCase().startsWith(this.state.searchTerm.toLowerCase()) || 
        student.lastName.toLowerCase().startsWith(this.state.searchTerm.toLowerCase())))
        {    
          return this.getFilteredByTag(student);
        }
    });
  }

  getFilteredByTag(student){
  
    let parseTags = [];
    const tagsOutput = localStorage.getItem('TagsList' + student.id);
    if(tagsOutput !== null){
      parseTags = JSON.parse(tagsOutput);
          if (parseTags.tags && parseTags.tags.some(tag =>tag.startsWith(this.state.searchTag.toLowerCase())))
          {
            student.tags = parseTags.tags;
            return student;
          }
    }
  }
  

  render(){

    const {isLoaded, allStudents} = this.state;
    if(!isLoaded){ return <div>Loading Data...</div> }

    const filteredStudents = this.getFilteredStudents(allStudents);

    return (
      <div className="Outer">
      <div>
        <input 
          placeholder="Search by name" 
          type="text" 
          className="textInput" 
          id="search"
          autoComplete="off"
          onChange={this.getBySearchTerm} 
        />
      </div>
      <div>
        <input 
          placeholder="Search by tag" 
          type="text" 
          className="tagInput" 
          id="searchTag"
          autoComplete="off"
          onChange={event => {this.setState({searchTag: event.target.value})}} 
        />
      </div>
        {this.renderStudentList(filteredStudents)}
      </div>
      
      
    );
  }  
}

export default App;
