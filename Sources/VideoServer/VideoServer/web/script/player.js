window.Vsrv = window.Vsrv || {};

Vsrv.Player = (function () {

    var Status = {
        NONE: 0,
        STOPPED: 1,
        PLAYING: 2,
        PAUSED: 3
    };

    var contentUrl = "static?pwd={0}&path=".format(getURLParam("secret"));
    var currStatus = Status.NONE;
    var idleMouseTimer;

    var setStatus = function (status) {
        currStatus = status;
    }

    var init = function () {
        $("body").mousemove(function (ev) {
            $("body").removeClass('noCursor');
            clearTimeout(idleMouseTimer);
            if (currStatus == Status.PLAYING) {
                idleMouseTimer = setTimeout(function () {
                    $("body").addClass('noCursor');
                }, 3000);
            }
        });
    }

    var videoEnded = function () {
        if (Vsrv.Playlist.nextVideo()) {
            setStatus(Status.PLAYING);
            play();
        } else {
            setStatus(Status.PAUSED);
        }
    };

    var videoStarted = function () {
        setStatus(Status.PLAYING);
        $("#plcPause").show();
        $("#plcPlay").hide();
    };

    var videoPaused = function () {
        setStatus(Status.PAUSED);
        $("#plcPause").hide();
        $("#plcPlay").show();
    }

    var play = function () {
        setStatus(Status.PLAYING);
        document.getElementById("vidVideo").play();
    }

    var pause = function () {
        setStatus(Status.PAUSED);
        document.getElementById("vidVideo").pause();
    }

    var setVideoSrc = function (path) {
        if (path != null) {
            $("#vidVideo").attr("src", contentUrl + path);
            console.log("src: " + path);
            if (currStatus == Status.PLAYING)
            {
                play();
            }
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
        setVideoSrc: setVideoSrc,
        init: init
    };

})();
