import React, {useState} from 'react'

function Tag(props){
    const [ tags , setTags ] = useState(props.tags ? [...props.tags]: []);
    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };
    
    return(
        <div>
        <div className="tagsInput">
            {tags.map((tag, index) => (
                <span key={index}>        
                    <i className="tagsListed">{tag}</i>
                    <i>&ensp;</i>
                </span>
            ))}
            </div>
            <div>
        <input
            type="text"
            className="addTag"
            onKeyUp={event => addTags(event)}
            placeholder="Add Tag"
        />
        </div>
        </div>
    
    )

}

export default Tag