var flag, height, width;
const colorList = ["#ff671f", "#046a38", "#c60c33", "#ffffff", "#005bbb", "#ffd700"];
const color1 = ["#c60c30", "#ffffff"];
const color2 = ["#ff671f", "#ffffff"]
document.addEventListener("DOMContentLoaded", () => {
    addDragRotateHandler(`.rotate0`)
    // Get references to the color pickers and divs
    const colorPickers = [
        document.getElementById('color1'),
        document.getElementById('color2'),
        document.getElementById('color3')
    ];

    const colorDivs = [
        document.getElementById('div1'),
        document.getElementById('div2'),
        document.getElementById('div3')
    ];
    // Add event listeners to each color picker
    colorPickers.forEach((colorPicker, index) => {
        colorPicker.addEventListener('input', function () {
            // Get the selected color from the color picker
            const selectedColor = colorPicker.value;
            // Apply the selected color to the corresponding div
            colorDivs[index].style.backgroundColor = selectedColor;
        });

        // Set the initial value of the color picker to the div's background color
        colorPicker.value = rgbToHex(colorDivs[index].style.backgroundColor);
    });

    // Add ranodm flag
    document.getElementById('random').addEventListener("click", () => {
        var flags = document.getElementById('flags').querySelectorAll('.column');
        (flags[Math.floor(Math.random() * 60) + 1]).click();
    })

    var uploadedFile = document.getElementById('upload');
    flag = document.getElementById('flag');
    var heightInput = document.getElementById('heightInput');
    var widthInput = document.getElementById('widthInput');
    var colorInput = document.getElementById('colorInput');
    heightInput.value = document.getElementById('flag-container').offsetHeight;
    widthInput.value = document.getElementById('flag-container').offsetWidth;
    // Function to update flag size based on input values
    function updateFlagSize() {
        height = parseInt(heightInput.value);
        width = parseInt(widthInput.value);

        flag.style.height = height + 'px';
        flag.style.width = width + 'px';
    }

    // Function to update flag background color
    function updateFlagColor() {
        var color = colorInput.value;
        flag.style.backgroundColor = color;
        flag.style.backgroundImage = 'none';
    }

    // Add event listeners to input elements
    heightInput.addEventListener('input', updateFlagSize);
    widthInput.addEventListener('input', updateFlagSize);
    colorInput.addEventListener('input', updateFlagColor);

    // Initial update
    updateFlagSize();
    uploadedFile.addEventListener('change', function () {
        var file = uploadedFile.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                flag.style.backgroundImage = 'url(' + e.target.result + ')';
            };
            reader.readAsDataURL(file);
        }
    });

    // Generate 50 divs with a random mix of vertical and horizontal bars
    const types = Array(50).fill().map((_, i) => i % 2 === 0 ? 'vertical' : 'horizontal');
    shuffleArray(types);

    types.forEach(type => {
        createBars(colorList, type, Math.floor(Math.random() * 3) + 2);
    });
    for (let i = 0; i < 10; i++) {
        createBars(colorList, 'vertical', 2);
        createBars(colorList, 'horizontal', 2);
        createBars(colorList, 'triangle', 2);
        createBars(color1, 'vertical', 7);
        createBars(color1, 'horizontal', 7);
        createBars(color2, 'vertical', 7);
        createBars(color2, 'horizontal', 7);
        createBars(["#ffffff", "#ffff00"], 'vertical', 7);
        createBars(["#ffffff", "#ffff00"], 'horizontal', 7);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const tabItems = Array.from(document.querySelectorAll(".tab-item"));
    const tabContents = Array.from(document.querySelectorAll(".tab-content"));
    tabItems.forEach(tabItem => {
        tabItem.addEventListener("click", () => {
            tabItems.forEach(item => {
                item.classList.remove('is-active');
            })
            tabItem.classList.remove('is-active');
            tabItem.classList.add('is-active')
            // Hide all tab contents
            tabContents.forEach(tabContent => {
                tabContent.classList.add('setnone');
            });

            // Get the target of the clicked tab item
            const target = tabItem.getAttribute("data-target");

            // Show the corresponding tab content
            const content = document.getElementById(target);
            content.classList.remove('setnone');

        });
    });

    // Initially, display the default tab content (Flags)
    document.getElementById("flags").classList.remove('setnone');

    // Get the "flags" container
    const flagsContainer = document.getElementById("flags");

    // Get all elements with the class "column"
    const columnElements = Array.from(flagsContainer.querySelectorAll(".org"));
    const colorPickersDiv = document.getElementById("colorpickers");
    // Add click event listeners to the "column" elements
    columnElements.forEach(columnElement => {
        columnElement.addEventListener("click", () => {
            // Get the innerHTML of the clicked element
            const innerHTML = columnElement.innerHTML;

            // Create a new div element to hold the innerHTML
            const div = document.createElement("div");
            div.innerHTML = innerHTML;
            div.style.width = "100%";
            div.style.height = "100%";
            div.id = "flag";

            flag.innerHTML = '';

            // Append the new div to the "flags" container
            flag.appendChild(div);

            // Check if the innerHTML contains multiple div elements
            var divsInInnerHTML = div.querySelectorAll("div");

            if (divsInInnerHTML.length > 1) {
                // Clear the "colorpickers" div first
                colorPickersDiv.innerHTML = '';

                // Create color pickers for each div and append them to the "colorpickers" div
                divsInInnerHTML.forEach((innerDiv, index) => {
                    const colorPicker = document.createElement("input");
                    colorPicker.type = "color";
                    colorPicker.value = rgbToHex(innerDiv.style.backgroundColor);

                    // Add a change event listener to update the background color
                    colorPicker.addEventListener("input", (event) => {
                        innerDiv.style.backgroundColor = event.target.value;
                    });
                    colorPicker.classList.add('sp-replacer');
                    var div = document.createElement('div');
                    div.appendChild(colorPicker);
                    div.classList.add('column');
                    div.classList.add('is-3');
                    // Append the color picker to the "colorpickers" div
                    colorPickersDiv.appendChild(div);
                });
            }
        });
    });
    const imgcolumns = Array.from(flagsContainer.querySelectorAll(".flagimg"))
    imgcolumns.forEach(element => {
        element.addEventListener('click', () => {
            flag.innerHTML = element.outerHTML;
            initializeColorPicker();
        });
    })
    // Remove the 'selected' class when clicking anywhere else on the document
    flag.addEventListener('click', function (event) {
        var divs = flag.getElementsByTagName('div'); // Get all images in the flag container
        var rotaters = flag.querySelectorAll('.rotater');
        rotaters.forEach(rotater => {
            rotater.style.display = 'none';
        });
        for (var i = 0; i < divs.length; i++) {
            divs[i].classList.remove('selected'); // Remove 'selected' class from all images
        }
        document.getElementById('delete').disabled = true;
        document.getElementById('flip').disabled = true;
    });

    document.getElementById('delete').addEventListener('click', () => {
        var element = document.querySelector('.selected');
        if (element) {
            element.parentNode.removeChild(element);
            document.getElementById('delete').disabled = true;
            document.getElementById('flip').disabled = true;
        }
    });
    dragElement(document.querySelector('.resizable'));
    var resizableDiv = document.getElementById('staticdiv');
    resizableDiv.addEventListener('click', function (event) {
        selectImage(resizableDiv);
        event.stopPropagation();
    });

    resizableDiv.addEventListener('mousedown', function (event) {
        selectImage(resizableDiv);
        event.stopPropagation();
    });

    document.getElementById('flip').addEventListener('click', () => {
        var type = document.getElementById('fliptype').value;
        flipImage(type);
    })
});

function newFlag() {
    flag.innerHTML = '';
    document.getElementById('colorpickers').innerHTML = '';
}

var divCounter = 1;
function appendImageToFlag(element, id) {
    var imageUrl;
    if (element.tagName === 'IMG') {
        imageUrl = element.src;
    } else if (element.files.length > 0) {
        var file = element.files[0];
        imageUrl = URL.createObjectURL(file);
    }

    if (imageUrl) {
        // Create a new image element
        var newImage = document.createElement('img');
        newImage.style.width = '100px';
        newImage.style.height = '100px';
        newImage.src = imageUrl;

        var resizableDiv = document.createElement('div');
        resizableDiv.classList.add('resizable');
        resizableDiv.innerHTML = `<div class='resizers '>
        <div class="dragger"></div>
                <div class='resizer bottom-right'></div>
            </div>`;
        resizableDiv.style.backgroundImage = 'url(' + imageUrl + ')';

        resizableDiv.addEventListener('click', function (event) {
            selectImage(resizableDiv);
            event.stopPropagation();
        });

        resizableDiv.addEventListener('mousedown', function (event) {
            selectImage(resizableDiv);
            event.stopPropagation();
        });
        resizableDiv.classList.add(`rotate${divCounter}`);
        var rotater = document.createElement('div');
        rotater.classList.add('rotater');
        rotater.style.display = 'none';
        resizableDiv.appendChild(rotater);
        console.log(id);
        document.querySelector(id).appendChild(resizableDiv);
        makeElementResizable('.resizable');
        dragElement(resizableDiv);
        addDragRotateHandler(`.rotate${divCounter}`)
        divCounter++;
    }
}

function selectImage(element) {
    var divs = flag.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove('selected');
    }
    flag.querySelectorAll('.rotater').forEach(element => {
        element.style.display = 'none';
    });
    element.classList.add('selected');
    element.querySelector('.rotater').style.display = '';
    document.getElementById('delete').disabled = false;
    document.getElementById('flip').disabled = false;
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var header = elmnt.querySelector('.dragger');
    if (header) {
        header.onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        // elmnt.classList.add('selected');
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function downloadImage() {
    var divs = Array.from(flag.getElementsByTagName('div'));
    for (var i = 0; i < divs.length; i++) {
        divs[i].classList.remove('selected');
    }

    const divToCapture = document.getElementById('flag');
    const selectedFormat = document.getElementById('imagetype').value;

    // Get the selected image size
    const selectedSize = document.getElementById('imageSize').value;

    // Set the width and height based on the selected size
    let width, height;

    switch (selectedSize) {
        case 'original':
            width = divToCapture.offsetWidth;
            height = divToCapture.offsetHeight;
            break;
        case 'x-large':
            width = 4800;
            height = 4800 * (divToCapture.offsetHeight / divToCapture.offsetWidth);
            break;
        case 'large':
            width = 2400;
            height = 2400 * (divToCapture.offsetHeight / divToCapture.offsetWidth);
            break;
        case 'medium':
            width = 1200;
            height = 1200 * (divToCapture.offsetHeight / divToCapture.offsetWidth);
            break;
        case 'small':
            width = 600;
            height = 600 * (divToCapture.offsetHeight / divToCapture.offsetWidth);
            break;
        default:
            // Handle unknown size
            break;
    }

    var scaleX = parseFloat(width / divToCapture.offsetWidth);
    var scaleY = parseFloat(height / divToCapture.offsetHeight);
    divToCapture.style.transform = `scaleX(${scaleX}) scaleY(${scaleY})`;

    html2canvas(divToCapture, {
        width: width,
        height: height,
        scaleX: scaleX,
        scaleY: scaleY,
        ignoreElements: element => element.classList.contains('rotater')
    }).then(function (canvas) {
        const link = document.createElement('a');
        link.download = 'flag_' + selectedSize + '.' + selectedFormat;
        link.href = canvas.toDataURL('image/' + selectedFormat);
        link.click();
    });
    divToCapture.style.transform = 'scale(1)';
}



// Making elements resizable
function makeElementResizable(div) {
    const element = document.querySelector(div);
    const bottomRightResizer = element.querySelector('.resizer.bottom-right'); // Get the bottom-right resizer
    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;

    bottomRightResizer.addEventListener('mousedown', function (e) {
        e.preventDefault();
        original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
        original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
        original_x = element.getBoundingClientRect().left;
        original_y = element.getBoundingClientRect().top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);
    });

    function resize(e) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y);

        if (width > minimum_size) {
            element.style.width = width + 'px';
        }

        if (height > minimum_size) {
            element.style.height = height + 'px';
        }
    }
    function stopResize() {
        window.removeEventListener('mousemove', resize);
    }
}


// Rotating Elements
function addDragRotateHandler(elementSelector) {
    var targetElement = document.querySelector(elementSelector);
    var offset = getOffset(targetElement);
    var rotater = targetElement.querySelector('.rotater');
    var mouseDown = false;

    function mouse(evt) {
        if (mouseDown) {
            var center_x = offset.left + targetElement.offsetWidth / 2;
            var center_y = offset.top + targetElement.offsetHeight / 2;
            var mouse_x = evt.pageX;
            var mouse_y = evt.pageY;
            var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
            var degree = (radians * (180 / Math.PI) * -1) + 90;
            targetElement.style.transform = 'rotate(' + degree + 'deg)';
        }
    }

    rotater.addEventListener('mousedown', function (e) {
        mouseDown = true;
        document.addEventListener('mousemove', mouse);
    });

    document.addEventListener('mouseup', function (e) {
        mouseDown = false;
    });

    function getOffset(el) {
        var rect = el.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
        };
    }
}

// Flip object
function flipImage(flipType) {
    var flippableImage = document.querySelector('.selected');
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = flippableImage.clientWidth;
    canvas.height = flippableImage.clientHeight;

    var backgroundImage = getComputedStyle(flippableImage).backgroundImage;

    // Create an Image object to load the background image
    var img = new Image();
    img.src = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');

    // Ensure the image is loaded before flipping
    img.onload = function () {
        if (flipType === 'v') {
            // Flip vertically
            ctx.scale(1, -1);
            ctx.drawImage(img, 0, -flippableImage.clientHeight, flippableImage.clientWidth, flippableImage.clientHeight);
        } else if (flipType === 'h') {
            // Flip horizontally
            ctx.scale(-1, 1);
            ctx.drawImage(img, -flippableImage.clientWidth, 0, flippableImage.clientWidth, flippableImage.clientHeight);
        } else {
            // Default behavior: flip vertically
            ctx.scale(1, -1);
            ctx.drawImage(img, 0, -flippableImage.clientHeight, flippableImage.clientWidth, flippableImage.clientHeight);
        }

        // Change the background image of the existing element to the flipped image
        flippableImage.style.backgroundImage = 'url(' + canvas.toDataURL() + ')';
    };
}

// Function to initialize color picker
function initializeColorPicker() {
    document.getElementById('colorpickers').innerHTML = "";
    const image = document.querySelector('.flagimg').querySelector('img');
    const colorPicker = document.getElementById('colorInput');

    image.addEventListener('click', (event) => {
        const x = event.offsetX;
        const y = event.offsetY;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const selectedColor = getPixelColor(imageData, x, y);

        // Remove the border from the previously selected area
        const prevSelectedArea = document.querySelector('.selected-area');
        if (prevSelectedArea) {
            prevSelectedArea.classList.remove('selected-area');
        }

        // Highlight the selected area
        image.classList.add('selected-area');

        // Show color picker at the clicked position
        colorPicker.value = rgbToHex(selectedColor);
        colorPicker.style.left = `${event.clientX}px`;
        colorPicker.style.top = `${event.clientY}px`;
        colorPicker.style.display = 'block';

        // Handle color picker value change
        colorPicker.addEventListener('change', () => {
            updateImageColor(image, imageData, selectedColor, colorPicker.value);
        });
    });
}

// Function to update the color of a pixel in the image
function updateImageColor(image, imageData, oldColor, newColor) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;

    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const currentColor = getPixelColor(imageData, x, y);
            if (colorsAreEqual(currentColor, oldColor)) {
                // Change the color of the pixel to the new color
                context.fillStyle = newColor;
                context.fillRect(x, y, 1, 1);
            }
            else {
                context.fillStyle = currentColor;
                context.fillRect(x, y, 1, 1);
            }
        }
    }

    // Set the modified image as the source of the original image element
    image.src = canvas.toDataURL();
}

// Function to check if two colors are approximately equal
function colorsAreEqual(color1, color2) {
    return color1.toLowerCase() === color2.toLowerCase();
}

// Function to get RGB values from a pixel
function getPixelColor(imageData, x, y) {
    const index = (y * imageData.width + x) * 4;
    const red = imageData.data[index];
    const green = imageData.data[index + 1];
    const blue = imageData.data[index + 2];
    return `rgb(${red}, ${green}, ${blue})`;
}

function rgbToHex(rgb) {
    // Check if the RGB value is in the correct format
    if (!rgb || rgb.indexOf("rgb(") !== 0) {
        return null;
    }

    // Extract the individual RGB components
    const rgbArray = rgb
        .replace("rgb(", "")
        .replace(")", "")
        .split(",")
        .map(component => parseInt(component.trim()));

    // Convert the RGB components to hexadecimal and format them as a hex color code
    const hexColor = "#" + rgbArray.map(component => {
        const hex = component.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");

    return hexColor;
}

function createBars(colorList, type, count) {
    const column = document.createElement('div');
    column.classList.add('column');
    column.classList.add('org');
    column.classList.add('is-5');
    column.classList.add('has-background-grey-light');
    column.classList.add('mx-1');
    column.classList.add('mt-2');
    const container = document.createElement('div');
    var random1 = Math.floor(Math.random() * 2222) + 1;
    column.classList.add(`object${random1}`)
    column.style.position = "relative";
    container.classList.add(type === 'vertical' ? 'vertical-bars-container' : 'horizontal-bars-container');
    var Images = ['Symbol', 'Creature'];
    var random = Images[Math.floor(Math.random() * Images.length)];
    var Image = document.createElement('img');
    Image.classList.add('staticimg');
    var src;
    if (random == "Symbol") {
        src = './img/Symbols/Symbol_' + (Math.floor(Math.random() * 15) + 1) + '.PNG';
    }
    else if (random == "Creature") {
        src = './img/Creatures/Creature_' + (Math.floor(Math.random() * 47) + 1) + '.png';
    }
    Image.src = src;
    let previousColor = null;
    // Add triangle div based on conditions
    var isFirstOrLast;

    for (let i = 0; i < count; i++) {
        isFirstOrLast = i === 0 || i === count - 1;
        const bar = document.createElement('div');
        bar.classList.add(type === 'vertical' ? 'vertical-bar' : 'horizontal-bar');
        const color = getRandomColor(colorList, previousColor, isFirstOrLast);
        bar.style.backgroundColor = color;
        container.style.backgroundColor = getRandomColor(colorList, previousColor, isFirstOrLast);
        previousColor = color;
        container.appendChild(bar);
    }
    if (count == 2 && type == "triangle") {
        const triangleDiv = document.createElement('div');
        triangleDiv.classList.add(type === 'vertical' ? 'top-triangle' : 'left-triangle');
        const color = getRandomColor(colorList, previousColor, isFirstOrLast);
        triangleDiv.style.backgroundColor = color;
        container.appendChild(triangleDiv);
    }

    column.appendChild(container);
    container.appendChild(Image);
    document.getElementById('flags').appendChild(column);
}


function getRandomColor(colorList, previousColor, isFirstOrLast) {
    let newColor = previousColor;

    // Ensure the new color is different from the previous color
    while (newColor === previousColor || (isFirstOrLast && newColor === "#ffffff")) {
        newColor = colorList[Math.floor(Math.random() * colorList.length)];
    }

    return newColor;
}