import React from 'react';

function Student(props){
       
    const expandButton =  <button type="button" onClick={() => props.handleChange(props.student.id)} className="plus">+</button>
    const collapseButton =  <button type="button" onClick={() => props.handleChange(props.student.id)} className="minus">-</button>

    var sum = 0;
    for(var i = 0; i < props.student.grades.length; i++){
        sum += parseFloat(props.student.grades[i]);
    }

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
                <p>Average: {sum/props.student.grades.length}%</p>   
            </div>
            <div>
                {props.student.expanded ? collapseButton : expandButton }
            </div>
            <div className = "grades">
            <div className ={"collapse" + (props.student.expanded ? 'open' : '')}>
                <span>Test1: {props.student.grades[0]}% </span><br></br>
                <span>Test2: {props.student.grades[1]}% </span><br></br>
                <span>Test3: {props.student.grades[2]}% </span><br></br>
                <span>Test4: {props.student.grades[3]}% </span><br></br>
                <span>Test5: {props.student.grades[4]}% </span><br></br>
                <span>Test6: {props.student.grades[5]}% </span><br></br>
                <span>Test7: {props.student.grades[6]}% </span><br></br>
                <span>Test8: {props.student.grades[7]}% </span><br></br>
            </div>
            </div>
            <div className="line"></div>
        </div>
    )
}

export default Student



