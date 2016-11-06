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
        var item = Vsrv.Playlist.getItemPath(1);
        if (item) {
            setVideoSrc(item);
            if (currStatus === Status.PLAYING) {
                document.getElementById("vidVideo").play();
            }
        }
    };

    var videoStarted = function () {
        currStatus = Status.PLAYING;
    };

    var videoPaused = function () {
        currStatus = Status.PAUSED;
    }

    var fileAdded = function () {
        var item = Vsrv.Playlist.getItemPath(0);
        setVideoSrc(item);
    };

    var setVideoSrc = function (path) {
        if (path != null) {
            $("#vidVideo").attr("src", contentUrl + path);
            Vsrv.Playlist.setPlaying(path);
            if (currStatus === Status.PLAYING) {
                document.getElementById("vidVideo").play();
            }
            console.log("src: " + path);
            return true;
        } else {
            return false;
        }
    };

    return {
        videoStarted: videoStarted,
        videoPaused: videoPaused,
        videoEnded: videoEnded,
        fileAdded: fileAdded,
        setVideoSrc: setVideoSrc
    };

})();
