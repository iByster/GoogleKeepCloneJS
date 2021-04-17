   

const createNotes = function(notes) {
    const fragment = document.createDocumentFragment();
    const fragmentPinned = document.createDocumentFragment();
    notes.forEach(note => {
  
        const container = createNoteContainer(note, '');

        if(note.pinned === "true"){
            fragmentPinned.appendChild(container);
        } else {
            fragment.appendChild(container);
        }
        
    })

    return [fragment, fragmentPinned];

}



const displayNotes = async function() {
    const notes = await getNotes();

    createWorkBoard(notes);

}

const createWorkBoard = function(notes){
    const workBoard = document.getElementById("work-board");
    const pinnedWorkBoard = document.getElementById("pinded-work-board");

    workBoard.innerHTML = '';
    pinnedWorkBoard.innerHTML = '';

    const fragments = createNotes(notes);

    if(fragments[1].childNodes.length > 0){
        if(pinnedWorkBoard.parentElement.firstChild.tagName != 'H1'){
            const headerPin = document.createElement('h1');
            headerPin.innerHTML = "PINNED";
            headerPin.classList.add("section-headers");
            pinnedWorkBoard.parentElement.insertBefore(headerPin, pinnedWorkBoard.parentElement.firstChild);
            
        }
        if(workBoard.parentElement.firstChild.tagName != 'H2'){
            const headerNormal = document.createElement('h2');
            headerNormal.innerHTML = "OTHERS";
            headerNormal.classList.add("section-headers");
            workBoard.parentElement.insertBefore(headerNormal, workBoard.parentElement.firstChild);
        }
    }

    workBoard.appendChild(fragments[0]);
    pinnedWorkBoard.appendChild(fragments[1]);

    const notes2 = document.getElementsByClassName("note");

    Array.prototype.forEach.call(notes2, note => note.addEventListener('mouseenter', addUtilsNote, false));
    Array.prototype.forEach.call(notes2, note => note.addEventListener('mouseleave', removeUtilsNote, false));
    Array.prototype.forEach.call(notes2, note => note.addEventListener('click', expendNote, false));

}

let inputNoteOpened = false;
const overlayContainer = document.querySelector('[data-overlay]');

const addNewNoteContainer = document.getElementById('note-input');
addNewNoteContainer.addEventListener('click', expendAddNewNoteContainer, false);

displayNotes();



