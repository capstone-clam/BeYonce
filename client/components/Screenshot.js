import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

//wrapping the whole script in an anonymous function to avoid global varaible, then setting up various varibales we'll be using
(function(){
    var width = 320; //we will scalle the photo width to this //Whatever size the incoming video is, we're going to scale the resulting image to be 320 pixels wide.
    var height = 0; //this will be computed based on the input stream //The output height of the image will be computed given the width and the aspect ratio of the stream.

    var streaming = false;
    //Indicates whether or not there is currently an active stream of video running.

    var video = null; //This will be a reference to the <video> element after the page is done loading.
    var canvas = null; //This will be a reference to the <canvas> element after the page is done loading.
    var photo = null; //This will be a reference to the <img> element after the page is done loading.
    var startbutton = null; //This will be a reference to the <button> element that's used to trigger capture. We'll get that after the page is done loading.

})

//grab references to the major elements we need to be able to access
function startup(){
    video = document.getElementById('video');
    canvas = document.getElementById('canavs');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');
}

//get the media stream

navigator.mediaDevices.getUserMedia({video:true, audio:false})
    .then(function(stream){
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err){
        console.log("An error occured: " + err)
    });
//Here, we're calling MediaDevices.getUserMedia() and requesting a video stream (without audio). It returns a promise which we attach success and failure callbacks to.

// The success callback receives a stream object as input. It is the <video> element's source to our new stream.

// Once the stream is linked to the <video> element, we start it playing by calling HTMLMediaElement.play().

video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);

      if(isNan(height)){
          height=width/(4/3)
      }
    
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

//   Listen for the video to start playing
// After calling HTMLMediaElement.play() on the <video>, there's a (hopefully brief) period of time that elapses before the stream of video begins to flow. To avoid blocking until that happens, we add an event listener to video for the canplay event, which is delivered when the video playback actually begins. At that point, all the properties in the video object have been configured based on the stream's format.


// This callback does nothing unless it's the first time it's been called; this is tested by looking at the value of our streaming variable, which is false the first time this method is run.

// If this is indeed the first run, we set the video's height based on the size difference between the video's actual size, video.videoWidth, and the width at which we're going to render it, width.

// Finally, the width and height of both the video and the canvas are set to match each other by calling Element.setAttribute() on each of the two properties on each element, and setting widths and heights as appropriate. Finally, we set the streaming variable to true to prevent us from inadvertently running this setup code again.

startbutton.addEventListener('click', function(ev){
    takepicture();
    ev.preventDefault();
}, false);

clearphoto();
}


//To capture a still photo each time the user clicks the startbutton, we need to add an event listener to the button, to be called when the click event is issued:

// it just calls our takepicture() function, defined below in the section Capturing a frame from the stream, then calls Event.preventDefault() on the received event to prevent the click from being handled more than once

function clearphoto(){
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA"
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data= canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
}

// We start by getting a reference to the hidden <canvas> element that we use for offscreen rendering.  Next we set the fillStyle to #AAA (a fairly light grey), and fill the entire canvas with that color by calling fillRect().

// Last in this function, we convert the canvas into a PNG image and call photo.setAttribute() to make our captured still box display the image.

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

    window.addEventListener('load', startUp, false)
})()

// As is the case any time we need to work with the contents of a canvas, we start by getting the 2D drawing context for the hidden canvas.

// Then, if the width and height are both non-zero (meaning that there's at least potentially valid image data), we set the width and height of the canvas to match that of the captured frame, then call drawImage() to draw the current frame of the video into the context, filling the entire canvas with the frame image.

// Once the canvas contains the captured image, we convert it to PNG format by calling HTMLCanvasElement.toDataURL() on it; finally, we call photo.setAttribute() to make our captured still box display the image.

// If there isn't a valid image available (that is, the width and height are both 0), we clear the contents of the captured frame box by calling clearphoto().
