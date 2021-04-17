const addUtilsNote = function() {
    const util = this.querySelector('.utils');
    const pin = this.querySelector('.pin');

    util.classList.toggle('active');
    pin.classList.toggle('active');
}

const removeUtilsNote = function() {
    const util = this.querySelector('.utils');
    const pin = this.querySelector('.pin');

    util.classList.toggle('active');
    pin.classList.toggle('active');
}

const createUtilsBar = function(type, note) {
    const utils = document.createElement('div');
    utils.classList.add('utils')

    if(type === 'expended') {
        utils.classList.add('active', 'utils-expend');
        utils.style.backgroundColor = note.backgroundColor;
    }


    const trashBin = document.createElement('i');
    trashBin.classList.add('fa', 'fa-trash-o');
    trashBin.addEventListener('click', function(e){
        e.preventDefault();
        deleteNote(e, note.id)

    }, false);

    const addImageContainer = document.createElement('div');
    addImageContainer.setAttribute('data-imgadd', '');

    const uploadImage = document.createElement('input'); 
    uploadImage.setAttribute('type', 'file');
    uploadImage.setAttribute('id', 'addImage' + note.id);
    uploadImage.style.display = "none";
    uploadImage.addEventListener('change', function(){
        console.log(note.id);
        uploadImageToNote(this, note.id)
    }, false);

    const labelForIcon = document.createElement('label');
    labelForIcon.setAttribute('for', 'addImage' + note.id)

    const addImage = document.createElement('i');
    addImage.classList.add('fa', 'fa-photo');

    labelForIcon.appendChild(addImage);

    addImageContainer.appendChild(labelForIcon);
    addImageContainer.appendChild(uploadImage);

    
    const colorContainer = document.createElement('div');
    
    const colorPicker = document.createElement('div');
    colorPicker.classList.add('color-picker');
    if(type === 'expended') colorPicker.classList.add('color-picker-extend');

    const colors = ['red', 'aqua', 'yellow', 'rgb(166, 0, 255)', '#f77fbf', '#0dff00'];
    for(let i = 0; i < colors.length; i++){
        //console.log(i);
        let colorCirle = document.createElement('div');
        colorCirle.classList.add('color-circle');
        colorCirle.style.backgroundColor = colors[i];
        colorCirle.addEventListener('click', function(e){changeNoteColor(this, e)}, false);
        colorPicker.appendChild(colorCirle);
    }
    const brush = document.createElement('i')
    brush.classList.add('fa', 'fa-paint-brush');
    brush.addEventListener('mouseover', function(){showColorPicker(colorPicker)}, false);
    colorPicker.addEventListener('mouseleave', function(){closeColorPicker(colorPicker)}, false);
    colorContainer.appendChild(colorPicker);
    colorContainer.appendChild(brush);
    utils.appendChild(trashBin);
    utils.appendChild(addImageContainer);
    utils.appendChild(colorContainer);

    return utils;
}