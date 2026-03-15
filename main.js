const uploadButton = document.querySelector('#uploadButton');
const fileInput = document.querySelector('#fileInput');
const canvas = document.querySelector('#canvas');
const canvas1 = document.querySelector('#canvas1')

let img = new Image();

img.addEventListener('load', (e) => {
    let ctx = canvas.getContext('2d');
    let ctx1 = canvas1.getContext('2d');

    let maxDisplayWidth = 500;
    let maxDisplayHeight = 500;
    let maxReferenceWidth = 300;
    let maxReferenceHeight = 300;

    let displayWidthScale = maxDisplayWidth/img.width;
    let displayHeightScale = maxDisplayHeight/img.height;
    let referenceWidthScale = maxReferenceWidth/img.width;
    let referenceHeightScale = maxReferenceHeight/img.height;

    let displayScale = Math.min(displayWidthScale, displayHeightScale);
    let referenceScale = Math.min(referenceWidthScale, referenceHeightScale);
    if(img.width <= maxDisplayWidth && img.height <= maxDisplayHeight){
        displayScale = 1;
    }
    if(img.width <= maxReferenceWidth && img.height <= maxReferenceHeight){
        referenceScale = 1;
    }

    canvas.width = img.width*displayScale;
    canvas.height = img.height*displayScale;

    canvas1.width = img.width*referenceScale;
    canvas1.height = img.height*referenceScale;
    ctx.drawImage(img, 0, 0, img.width*displayScale, img.height*displayScale);
    ctx1.drawImage(img, 0, 0, img.width*referenceScale, img.height*referenceScale);
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