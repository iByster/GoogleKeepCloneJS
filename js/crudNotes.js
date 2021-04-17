//CRUD
const getNotes = function(){
    return fetch('http://localhost:3000/notes', {
        method: 'GET'
    }).then(result => result.json());
}

const findOneNote = function(id) {
    return fetch('http://localhost:3000/notes', {
        method: 'GET'
    }).then(result => result.json())
      .then(data => {
        // console.log(data.forEach(d => console.log(d['id'])))
        return data.filter(d => d['id'] == id);
      });
}

const updateNoteText = function(id, headerParam, contentParam, imageURL){
    fetch('http://localhost:3000/notes/' + id, {
        method: 'PATCH',
        body: JSON.stringify({
            header: headerParam,
            content: contentParam,
            image:imageURL
        }),
        headers: {
            'Content-Type': 'application/json'
        }  

    }).then(()=>displayNotes());

}

const updateNoteColor = function(id, color){
    fetch('http://localhost:3000/notes/' + id, {
        method: 'PATCH',
        body: JSON.stringify({
            backgroundColor: color
        }),
        headers: {
            'Content-Type': 'application/json'
        }  

    });

}

const deleteNote = function(e, id){
    fetch('http://localhost:3000/notes/' + id, {
        method: 'DELETE'
    });

}


const addNote = function(note) {
    
    fetch('http://localhost:3000/notes', { 
        method: 'POST',
        body: JSON.stringify({
            "header": note.header,
            "content": note.content,
            "backgroundColor": note.backgroundColor,
            "image":note.image,
            "pinned":"false"
        }),
        headers: {
            'Content-Type': 'application/json'
        }   
    });
};



const updateNoteImage = function(id, imageURL){
    console.log(imageURL);
    console.log(id);
   
    fetch('http://localhost:3000/notes/' + id, {
        method: 'PATCH',
        body: JSON.stringify({
            "image": imageURL
        }),
        headers: {
            'Content-Type': 'application/json'
        }  
        

    });

    

}


const togglePinNote = function(id, pinned){

    if(pinned === "true"){
        pinned = "false";
    } else {
        pinned = "true";
    }

    fetch('http://localhost:3000/notes/' + id, {
        method: 'PATCH',
        body: JSON.stringify({
            "pinned": pinned
        }),
        headers: {
            'Content-Type': 'application/json'
        }  

    });

}