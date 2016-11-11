window.Vsrv = window.Vsrv || {};

Vsrv.Playlist = (function () {

    var tblPlaylist;
    var currentVideo = "";

    var updatePlayingSelection = function () {
        $("#tblPlaylist tr").removeClass("rowSelected");
        var rws = tblPlaylist.rows().data();
        for (i in rws) {
            if (rws[i][1] === currentVideo) {
                $(tblPlaylist.row(i).node()).addClass("rowSelected");
                return;
            }
        }
    }

    var init = function () {
        tblPlaylist = $('#tblPlaylist').DataTable({
            "bPaginate": false,
            "bInfo": false,
            "scrollY": "500px",
            "bFilter": false,
            "bSort": false,
            "rowReorder": true
        });
        $('#tblPlaylist tbody').on('click', 'tr', function () {
            updatePlayerItem(tblPlaylist.row(this).data());
        });
    }

    var updatePlayerItem = function (item) {
        setPlayerVideo(item[1]);
    }

    var addItem = function (name, path) {
        var rws = tblPlaylist.rows().data();
        for (i in rws) {
            if (rws[i][1] === path) {
                console.log("Contained..");
                return;
            }
        }
        tblPlaylist.row.add([name, path]).draw(false);
        var rws = tblPlaylist.rows().data();
        if (rws.length === 1) {
            setPlayerVideo(path);
        }
    }

    var setPlayerVideo = function (path) {
        currentVideo = path;
        Vsrv.Player.setVideoSrc(path);
        updatePlayingSelection();
    }

    var getCurrentVideoIdx = function () {
        var rws = tblPlaylist.rows().data();
        for (i in rws) {
            if (rws[i][1] === currentVideo) {
                return parseInt(i);
            }
        }
        return -1;
    }

    var nextVideo = function () {
        var nidx = getCurrentVideoIdx() + 1;
        var rws = tblPlaylist.rows().data();
        if (nidx < rws.length) {
            setPlayerVideo(rws[nidx][1]);
            return true;
        } else {
            console.log("Playlist finished");
            return false;
        }
    }

    return {
        init: init,
        addItem: addItem,
        nextVideo: nextVideo
    };

})();