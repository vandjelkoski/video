// Grab elements, create settings, etc.
var video = document.getElementById('video');

// Get access to the camera!
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    let constraints = {
        audio: true,
        video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 }
        }
    };

    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        let stream_settings = stream.getVideoTracks()[0].getSettings();
        // actual width & height of the camera video
        let stream_width = stream_settings.width;
        let stream_height = stream_settings.height;

        console.log('Width: ' + stream_width + 'px');
        console.log('Height: ' + stream_height + 'px');

        video.srcObject = stream;
        video.play();
    })


}

window.addEventListener('resize', resize, false);

video.height = 100; /* to get an initial width to work with*/
resize();

function resize() {
videoRatio = video.height / video.width;
windowRatio = window.innerHeight / window.innerWidth; /* browser size */

    if (windowRatio < videoRatio) {
        if (window.innerHeight > 50) { /* smallest video height */
                video.height = window.innerHeight;
        } else {
            video.height = 50;
    }
    } else {
        video.width = window.innerWidth;
    }

};
/* Legacy code below: getUserMedia 
else if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia({ video: true }, function(stream) {
        video.src = stream;
        video.play();
    }, errBack);
} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia({ video: true }, function(stream){
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
    }, errBack);
} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
    navigator.mozGetUserMedia({ video: true }, function(stream){
        video.srcObject = stream;
        video.play();
    }, errBack);
}
*/