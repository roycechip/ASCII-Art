const uploadButton = document.querySelector('#uploadButton');
const fileInput = document.querySelector('#fileInput');
const displayCanvas = document.querySelector('#displayCanvas');
const referenceCanvas = document.querySelector('#referenceCanvas')
const ASCIIArt = document.createElement('h4');
let displayCtx = displayCanvas.getContext('2d');
let referenceCtx = referenceCanvas.getContext('2d');

let img = new Image();

img.addEventListener('load', () => {
    //inserting images on displayCanvas and referenceCanvas
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

    displayCanvas.width = img.width*displayScale;
    displayCanvas.height = img.height*displayScale;

    referenceCanvas.width = img.width*referenceScale;
    referenceCanvas.height = img.height*referenceScale;
    displayCtx.drawImage(img, 0, 0, img.width*displayScale, img.height*displayScale);
    referenceCtx.drawImage(img, 0, 0, img.width*referenceScale, img.height*referenceScale);

    //converting referenceCanvas into ASCII art
    let referenceData = referenceCtx.getImageData(0, 0, referenceCanvas.width, referenceCanvas.height);
    let referencePixels = referenceData.data;
    console.log(referencePixels);
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