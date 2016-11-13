window.Vsrv = window.Vsrv || {};

Vsrv.Player = (function () {

    var Status = {
        NONE: 0,
        STOPPED: 1,
        PLAYING: 2,
        PAUSED: 3
    };
    //var contentUrl = "stream?path=";
    var contentUrl = "static/";
    var contentUrl = "static?path=";
    var currStatus = Status.NONE;

    var videoEnded = function () {
        if (Vsrv.Playlist.nextVideo()) {
            currStatus = Status.PLAYING;
            play();
        } else {
            currStatus = Status.PAUSED;
        }
    };

    var videoStarted = function () {
        currStatus = Status.PLAYING;
        $("#plcPause").show();
        $("#plcPlay").hide();
    };

    var videoPaused = function () {
        currStatus = Status.PAUSED;
        $("#plcPause").hide();
        $("#plcPlay").show();
    }

    var play = function () {
        currStatus = Status.PLAYING;
        document.getElementById("vidVideo").play();
    }

    var pause = function () {
        currStatus = Status.PAUSED;
        document.getElementById("vidVideo").pause();
    }

    var setVideoSrc = function (path) {
        if (path != null) {
            $("#vidVideo").attr("src", contentUrl + path);
            console.log("src: " + path);
            return true;
        } else {
            return false;
        }
    };

    return {
        play: play,
        pause: pause,
        videoStarted: videoStarted,
        videoPaused: videoPaused,
        videoEnded: videoEnded,
        setVideoSrc: setVideoSrc
    };

})();
