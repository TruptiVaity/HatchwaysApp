import React from 'react';
function Student(props){
    
    var size = props.student.grades.length; 
    // const sum = props.student.grades.reduce((a, i) => a + i)(0);
    const average = props.student.grades.reduce((a, b) => (a + b)) / props.student.grades.length;
    
    return(
        <div className = "studentComponent">
            <div className = "image">
                <img alt="" src= {props.student.pic} />
            </div>
            <div className = "studentDetails">
                <h2 className = "name">{props.student.firstName + " " +props.student.lastName}</h2>
                <p>Email: {props.student.email}</p>
                <p>Company: {props.student.company}</p>
                <p>Skill: {props.student.skill}</p>
                <p>Average: {average}</p>
                <div className="line"></div>
            </div>
        </div>
    )
}

export default Student



