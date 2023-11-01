var flag;
document.addEventListener("DOMContentLoaded", () => {
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


    var uploadedFile = document.getElementById('upload');
    flag = document.getElementById('flag');
    var heightInput = document.getElementById('heightInput');
    var widthInput = document.getElementById('widthInput');
    var colorInput = document.getElementById('colorInput');

    // Set default values
    heightInput.value = '300';
    widthInput.value = '500';

    // Function to update flag size based on input values
    function updateFlagSize() {
        var height = parseInt(heightInput.value);
        var width = parseInt(widthInput.value);

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

    // Get all elements with the class "column"
    const columnElements = Array.from(flagsContainer.querySelectorAll(".column"));
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

            // Clear the "flags" container first
            flag.innerHTML = '';

            // Append the new div to the "flags" container
            flag.appendChild(div);

            // Check if the innerHTML contains multiple div elements
            var divsInInnerHTML = div.querySelector("div");
            divsInInnerHTML = divsInInnerHTML.querySelectorAll("div");

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

    dragElement(document.getElementById('staticimg'));
});

function newFlag() {
    flag.innerHTML = '';
    document.getElementById('colorpickers').innerHTML = '';
}

function appendImageToFlag(element) {
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
        newImage.classList.add('default-postion', 'draggable-header', 'resizable', 'selected'); // Add 'selected' by default
        newImage.style.width = '100px';
        newImage.style.height = '100px';
        newImage.src = imageUrl;

        function toggleSelected() {
            var images = flag.getElementsByTagName('img');
            for (var i = 0; i < images.length; i++) {
                images[i].classList.remove('selected');
            }
            newImage.classList.add('selected');
        }

        newImage.addEventListener('click', function (event) {
            toggleSelected();
            event.stopPropagation();
        });

        newImage.addEventListener('mousedown', function (event) {
            toggleSelected();
            event.stopPropagation();
        });

        document.addEventListener('click', function () {
            toggleSelected();
        });

        flag.appendChild(newImage);
        dragElement(newImage);
    }
}


// Make draggable elements
var draggableElements = document.querySelectorAll('.draggable');

// Loop through each draggable element and make it draggable
draggableElements.forEach(function (el) {
    dragElement(el);
});

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var header = elmnt.querySelector('.draggable-header');
    if (header) {
        header.onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
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
    const divToCapture = document.getElementById('flag');
    const width = divToCapture.offsetWidth;
    const height = divToCapture.offsetHeight;

    const selectedFormat = document.getElementById('imagetype').value;

    html2canvas(divToCapture, { width, height }).then(function (canvas) {

        const link = document.createElement('a');
        link.download = 'flag.' + selectedFormat;
        link.href = canvas.toDataURL('image/' + selectedFormat);
        link.click();
    });
}