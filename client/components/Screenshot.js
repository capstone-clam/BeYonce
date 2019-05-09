import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function startup() {
startbutton.addEventListener('click', function(ev){
    takepicture();
    ev.preventDefault();
}, false);

clearphoto();
}

function clearphoto(){
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA"
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data= canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
}

function takepicture(){
    var context = canvas.getContext('2d');
    if(width && height){
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        var data = canvas.toDataUrl('image/png');
        photo.setAttribute('src', data);
    }else{
        clearphoto()
    }
}


// As is the case any time we need to work with the contents of a canvas, we start by getting the 2D drawing context for the hidden canvas.

// Then, if the width and height are both non-zero (meaning that there's at least potentially valid image data), we set the width and height of the canvas to match that of the captured frame, then call drawImage() to draw the current frame of the video into the context, filling the entire canvas with the frame image.

// Once the canvas contains the captured image, we convert it to PNG format by calling HTMLCanvasElement.toDataURL() on it; finally, we call photo.setAttribute() to make our captured still box display the image.

// If there isn't a valid image available (that is, the width and height are both 0), we clear the contents of the captured frame box by calling clearphoto().
