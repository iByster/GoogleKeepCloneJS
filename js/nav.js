document.getElementById("hamburger-icon").onclick = function() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');

    const links = document.getElementsByClassName("icon-extend");

    if(links[0].style.visibility === "visible"){
        for(let i = 0; i < links.length; i++){
            links[i].style.visibility = "hidden";

        }
    } else {
        for(let i = 0; i < links.length; i++){
            links[i].style.visibility = "visible";

        }
        
    }
}

const searchNotes = async function(obj) {
    const inputValue = document.getElementById('search').value;

    const notes = await getNotes();

    console.log(notes);

    const matchedNotes = [];

    notes.forEach(note => {
        if(note.header.includes(inputValue) || note.content.includes(inputValue)){
            matchedNotes.push(note);
        }
    });

    createWorkBoard(matchedNotes);
}

const submit = document.querySelector('[data-submit]');

submit.addEventListener('click', function() {searchNotes(this)}, false);

