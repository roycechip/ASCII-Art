const uploadButton = document.querySelector('#uploadButton');
const fileInput = document.querySelector('#fileInput');

uploadButton.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => {
    if(fileInput.files[0]['type'].split('/')[0]!=='image'){
        console.log('ERROR. Not an image file');
        return;
    }
    console.log("that's an image");

});