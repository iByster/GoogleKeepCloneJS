const changeNoteColorAddNote = function() {
    const noteContainer = document.getElementById("note-input");
    noteContainer.style.backgroundColor = this.style.backgroundColor;

}

const addNewNote = function() {
    
    const mainContainer = this.parentElement.parentElement;
    console.log(mainContainer);
    const mainContainerNodes = mainContainer.childNodes;
    console.log(mainContainerNodes);
    let imageURL = "";
    let headerPos = 1;
    let contentPos = 3;
    if(mainContainer.firstChild.classList.contains('image-container')){

        imageURL = mainContainer.firstChild.childNodes[1].src;
        headerPos = 2;
        contentPos = 4;
    }
    let note = {
         id : "",
         header: mainContainerNodes[headerPos].innerHTML,
         content:  mainContainerNodes[contentPos].innerHTML,
         backgroundColor: mainContainer.style.backgroundColor,
         image: imageURL
    }

    console.log(note);

    addNote(note);
}


const closeAddNote = function(obj, event) {
    const mainContainer = obj.parentElement;
    mainContainer.innerHTML = '';
    mainContainer.style.minHeight = '0';
    const header = document.createElement('h3');
    header.setAttribute("data-note-text", "Take a note...");
    header.setAttribute("contenteditable", "true");
    mainContainer.appendChild(header);
    inputNoteOpened = false;
    event.stopPropagation();

}


const uploadImageToAddNote = function(obj) {

    const imageContainer = document.createElement('div');
    imageContainer.classList.add("image-container");
    const trashBin = document.createElement('i');
    
    trashBin.classList.add('fa', 'fa-trash-o');
    const trashBinContainer = document.createElement('div');
    trashBinContainer.classList.add('trashbin-container', 'image-container-addnote');
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
    
    imageContainer.appendChild(trashBinContainer)



    const imgFile = obj.files[0];
    const mainContainer = obj.parentElement.parentElement.parentElement;
    const imageElem = new Image();
    const newImage = document.createElement('img');
    imageElem.src = URL.createObjectURL(imgFile);
    let dataURL = "";
    imageElem.onload = function() {
        let canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL("image/png");

        newImage.src = dataURL;  
    }

    imageContainer.appendChild(newImage);
    
    mainContainer.insertBefore(imageContainer, mainContainer.firstChild);


}

const expendAddNewNoteContainer = function() {
    if(!inputNoteOpened){
        this.innerHTML = '';
        this.style.minHeight = "100px";
        //this.setAttribute('id', 'take-a-note-extended');
        //console.log(this.childNodes);

        const close = document.createElement('div');
        close.classList.add('close');
        close.classList.add('close-add-note');
        close.addEventListener('click', function(e){closeAddNote(this, e)}, false);
        this.appendChild(close);


        const header = document.createElement('h3');
        header.setAttribute("data-note-text", "Title");
        header.setAttribute("contenteditable", "true");

        this.appendChild(header);

        const line = document.createElement('div');
        line.classList.add('line');

        this.appendChild(line);


        const text = document.createElement('p');
        text.setAttribute("data-note-text", "Take a note...");
        text.setAttribute("contenteditable", "true");

        this.appendChild(text);    

        const utils = document.createElement('div');
        utils.classList.add('utils-add-note');

        const addImageContainer = document.createElement('div');
        addImageContainer.setAttribute('data-imgadd', '');

        const uploadImage = document.createElement('input'); 
        // uploadImage.addEventListener('click', function(e){
        //     e.preventDefault();
        // }, false);
        uploadImage.setAttribute('type', 'file');
        uploadImage.setAttribute('id', 'addImage');
        uploadImage.style.display = "none";
        uploadImage.addEventListener('change', function(){
            uploadImageToAddNote(this)
        }, false);
        

        const labelForIcon = document.createElement('label');
        labelForIcon.setAttribute('for', 'addImage')

        const addImage = document.createElement('i');
        addImage.classList.add('fa', 'fa-photo');


        labelForIcon.appendChild(addImage);

        addImageContainer.appendChild(labelForIcon);
        addImageContainer.appendChild(uploadImage);
        const colorContainer = document.createElement('div');
        const colorPicker = document.createElement('div');
        colorPicker.classList.add('color-picker');
        colorPicker.classList.add('color-picker-add-note');
        const colors = ['red', 'aqua', 'yellow', 'rgb(166, 0, 255)', '#f77fbf', '#0dff00'];
        for(let i = 0; i < colors.length; i++){
            //console.log(i);
            let colorCirle = document.createElement('div');
            colorCirle.classList.add('color-circle');
            colorCirle.style.backgroundColor = colors[i];
            colorCirle.addEventListener('click', changeNoteColorAddNote, false);
            colorPicker.appendChild(colorCirle);
        }
        const brush = document.createElement('i')
        brush.classList.add('fa', 'fa-paint-brush');
        brush.addEventListener('mouseover', function(){showColorPicker(colorPicker)}, false);
        colorPicker.addEventListener('mouseleave', function(){closeColorPicker(colorPicker)}, false);
        colorContainer.appendChild(colorPicker);
        colorContainer.appendChild(brush);
        const addNoteBtn = document.createElement('button');
        addNoteBtn.addEventListener('click', addNewNote, false);
        addNoteBtn.innerHTML = "Add";
        addNoteBtn.classList.add('add-button');
 


        utils.appendChild(addImageContainer);
        utils.appendChild(colorContainer);
        utils.appendChild(addNoteBtn);

        this.appendChild(utils);
        

        inputNoteOpened = true;
    }
    
    
}