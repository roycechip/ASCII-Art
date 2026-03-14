const uploadButton = document.querySelector('#uploadButton');
const fileInput = document.querySelector('#fileInput');
const canvas = document.querySelector('#canvas');
let canvaswidth = canvas.width;
let canvasheight = canvas.height;

let img = new Image();

img.addEventListener('load', (e) => {
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvaswidth, canvasheight);
})

uploadButton.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
    if(fileInput.files[0]['type'].split('/')[0]!=='image'){
        console.log('ERROR. Not an image file');
        return;
    }
    //console.log("that's an image");

    const reader = new FileReader();
    reader.addEventListener('load', (e) => /*console.log(e.target.result)*/ img.src = e.target.result);
    reader.readAsDataURL(fileInput.files[0]);
});