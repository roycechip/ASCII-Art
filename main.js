const uploadButton = document.querySelector('#uploadButton');
const fileInput = document.querySelector('#fileInput');
const canvas = document.querySelector('#canvas');

let img = new Image();

img.addEventListener('load', (e) => {
    let ctx = canvas.getContext('2d');

    let maxWidth = 500;
    let maxHeight = 500;
    let widthScale = maxWidth/img.width;
    let heightScale = maxHeight/img.height;
    let scale = Math.min(widthScale, heightScale);
    if(img.width <= maxWidth && img.height <= maxHeight){
        scale = 1;
    }
    canvas.width = img.width*scale;
    canvas.height = img.height*scale;
    ctx.drawImage(img, 0, 0, img.width*scale, img.height*scale);
})

uploadButton.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
    let inputResult = fileInput.files[0]['type'].split('/');
    let supportedImageTypes = ['jpeg', 'jpg', 'png'];
    if(inputResult[0]!=='image' || !supportedImageTypes.includes(inputResult[1])){
        console.log('ERROR. Not an image file or not supported image type (supports .jpeg, .jpg and .png)');
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (e) => img.src = e.target.result);
    reader.readAsDataURL(fileInput.files[0]);
});