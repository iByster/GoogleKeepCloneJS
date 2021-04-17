const uploadImageToNote = function(input, id) {

    const imageElem = new Image();

    imageElem.src = URL.createObjectURL(input.files[0]);
    let dataURL = "";
    imageElem.onload = function() {
        let canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL("image/png");

        updateNoteImage(id, dataURL);  
    }

}

const changeNoteColor = function(obj, event) {

    updateNoteColor(obj.parentElement.parentElement.parentElement.parentElement.dataset.id, obj.style.backgroundColor);
    event.stopPropagation();
}


const showDeleteNoteImage = function(trashBin) {
    //alert('here')
    trashBin.style.display = "block";

}

const hideDeleteNoteImage = function(trashBin) {
    //alert('here')
    trashBin.style.display = "none";

}

const deleteNoteImage = function(obj) {
    const mainContainer = obj.parentElement.parentElement;
    const imageContainer = mainContainer.childNodes[0];
    mainContainer.removeChild(imageContainer);
}



const showColorPicker = function(colorPicker) {
    colorPicker.style.visibility = "visible";
    //brush.style.color = 'rgba(0, 0, 0, 0.802) !important'; 

}

const closeColorPicker = function(colorPicker) {
    colorPicker.style.visibility = "hidden";
} 


const createNoteContainer = function(note, type) {


    const container = document.createElement('div');
    container.classList.add('note');
    container.setAttribute('data-id', note.id);
    container.style.backgroundColor = note.backgroundColor;

    const pinContainer = document.createElement('div');
    pinContainer.classList.add('pin');
    pinContainer.addEventListener('mouseover', function(){
        pinContainer.style.backgroundColor = note.backgroundColor;
    }, false);
    pinContainer.addEventListener('mouseleave', function(){
        pinContainer.style.backgroundColor = '#ffffff00';
    }, false);
    const pinIcon = document.createElement('i');
    pinIcon.classList.add("fa", 'fa-map-pin');
    pinContainer.appendChild(pinIcon);
    pinContainer.addEventListener('click', function(e) {
        //console.log(note.pinned);
        togglePinNote(note.id, note.pinned);
        e.stopPropagation();
    }, false);
    container.appendChild(pinContainer);


    if(note.image !== ""){
        
        const noteImage = document.createElement('img');

        const imageURL = note.image;

        noteImage.src = imageURL;
            
        if(type === 'expended'){
            const imageContainer = document.createElement('div');
            imageContainer.classList.add("image-container");
            const trashBin = document.createElement('i');
            
            trashBin.classList.add('fa', 'fa-trash-o');
            const trashBinContainer = document.createElement('div');
            trashBinContainer.classList.add('trashbin-container');
            trashBinContainer.appendChild(trashBin);
            imageContainer.addEventListener('mouseover', function() {
                showDeleteNoteImage(trashBinContainer);
            }, false);
            imageContainer.addEventListener('mouseleave', function() {
                hideDeleteNoteImage(trashBinContainer);
            }, false);
            trashBinContainer.addEventListener('click', function() {
                deleteNoteImage(this);
            }, false);
            imageContainer.appendChild(noteImage);
            imageContainer.appendChild(trashBinContainer)
            container.appendChild(imageContainer);
        } else {
            container.appendChild(noteImage);
        }
        
    }

    if(type === 'expended'){
        const close = document.createElement('div');
        close.classList.add('close');
        close.addEventListener('click', function(){exitExpendedNote(this, note.id)}, false);
        container.appendChild(close);
    }
    
    const header = document.createElement('h2');
    if(type === 'expended') {
        header.setAttribute("contenteditable","true");
        header.setAttribute("data-expended-h2", "");
        header.style.backgroundColor = note.backgroundColor;
    }
    header.innerHTML = note.header;
    container.appendChild(header);

    const line = document.createElement('div');
    line.classList.add('line');
    container.appendChild(line);

    const contentContainer = document.createElement('div');
    contentContainer.classList.add('note-content');
    if(type === 'expended') {
        contentContainer.classList.add('note-content-expend');
    }
    const text = document.createElement('p');
    if(type === 'expended') {
        text.setAttribute("contenteditable","true");
        text.setAttribute("data-expended-p", "");
    }
    text.innerHTML = note.content;
    contentContainer.appendChild(text);
    container.appendChild(contentContainer);
    

    //console.log(note);
    const utils = createUtilsBar(type, note);
    utils.addEventListener('click', function(e){
        e.stopPropagation();
    }, false);

    container.appendChild(utils);
    return container;
    
    

    
}