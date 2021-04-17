const createExpendedNote = function(note) {
    const fragment = document.createDocumentFragment();

    const container = createNoteContainer(note, 'expended');
    
    container.classList.add('note-extended');

    fragment.appendChild(container);

    return fragment;
}

const exitExpendedNote = async function(obj, id) {

    //console.log(obj.parentElement.firstChild.firstChild.tagName);

    let imageURL = "";

    if (obj.parentElement.childNodes[1].classList.contains("image-container")){
        
        imageURL = obj.parentElement.childNodes[1].firstChild.src;
    };

    console.log(imageURL)

    const updatedHeader = document.querySelector('[data-expended-h2]');
    const updatedContent = document.querySelector('[data-expended-p]');
    console.log(updatedHeader.innerHTML);

    updateNoteText(id, updatedHeader.innerHTML, updatedContent.innerHTML, imageURL);

    overlayContainer.style.display = 'none';
    while (overlayContainer.firstChild){
        overlayContainer.removeChild(overlayContainer.firstChild);
    }
    document.body.style.overflow = 'visible';

    
}

const expendNote = async function(){
    //this.style.visibility = "hidden";
    //overlayContainer.addEventListener('click', exitExpendedNote(overlayContainer), false);
    // overlayContainer.addEventListener('click', function(e) {
    //     e.stopPropagation();
    //     exitExpendedNote(this, this.dataset.id)
    // }, false);
    document.body.style.overflow = 'hidden';
    overlayContainer.style.display = 'block';
    console.log(this);
    const jsonNote = await findOneNote(this.dataset.id);
    console.log(jsonNote[0]);
    const expendedNote = createExpendedNote(jsonNote[0]);
    // expendedNote.addEventListener('click', function(e){
    //     e.stopPropagation();
    // }, false);
    overlayContainer.appendChild(expendedNote);


}