const uploadButton = document.querySelector('#uploadButton');
const fileInput = document.querySelector('#fileInput');
const displayCanvas = document.querySelector('#displayCanvas');
const referenceCanvas = document.querySelector('#referenceCanvas');
const copy = document.querySelector('#copy');
const body = document.body;
const ASCIIArt = document.createElement('pre');
body.append(ASCIIArt);
let displayCtx = displayCanvas.getContext('2d', {willReadFrequently: true });
let referenceCtx = referenceCanvas.getContext('2d', {willReadFrequently: true });

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
    let referenceHeightScale = referenceWidthScale;

    let displayScale = Math.min(displayWidthScale, displayHeightScale);
    if(img.width <= maxDisplayWidth && img.height <= maxDisplayHeight){
        displayScale = 1;
    }

    displayCanvas.width = Math.floor(img.width*displayScale);
    displayCanvas.height = Math.floor(img.height*displayScale);

    referenceCanvas.width = maxReferenceWidth;
    referenceCanvas.height = Math.floor(img.height*referenceHeightScale);
    displayCtx.drawImage(img, 0, 0, img.width*displayScale, img.height*displayScale);
    referenceCtx.drawImage(img, 0, 0, maxReferenceWidth, Math.floor(img.height*referenceHeightScale));

    
    //converting referenceCanvas into ASCII art
    let referenceData = referenceCtx.getImageData(0, 0, referenceCanvas.width, referenceCanvas.height);
    let referencePixels = referenceData.data;
    let ASCIIResult = '';
    const ASCIIPalette = ['@', 'B', '%', '8', '&', 'W', 'M', '#', '*', 'o', 'a', 'h', 'k', 'b', 'd', 'p', 'q', 'w', 'm', 'Z', 'O', '0', 'Q', 'L', 'C', 'J', 'U', 'Y', 'X', 'z', 'c', 'v', 'u', 'n', 'x', 'r', 'j', 'f', 't', '/', '\\', '|', '(', ')', '1', '{', '}', '[', ']', '?', '-', '_', '+', '~', '<', '>', 'i', '!', 'l', 'I', ';', ':', ',', ' '];
    for(let i=0;i<referenceCanvas.height;i++){
        for(let j=0;j<referenceCanvas.width;j++){
            let index = (i*referenceCanvas.width+j)*4;
            let grayscale = (referencePixels[index]*0.299) + (referencePixels[index+1]*0.587) + (referencePixels[index+2]*0.114);
            ASCIIResult += ASCIIPalette[Math.floor(grayscale/4)];
        }
        ASCIIResult += '\n';
    }
    ASCIIArt.innerText = ASCIIResult;
    ASCIIArt.style.fontSize = `${window.innerWidth/(maxReferenceWidth*0.6)}px`;
    let tempScale = 10/ASCIIArt.style.fontSize.split('').slice(0, -2).join('');
    ASCIIArt.style.lineHeight = `${60*tempScale}%`
    ASCIIArt.style.outline = '2px solid black';
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

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(ASCIIArt.textContent);
})