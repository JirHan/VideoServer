window.Vsrv = window.Vsrv || {};

Vsrv.Playlist = (function () {

    var tblPlaylist;
    var currentVideo = "";

    var updatePlayingSelection = function () {
        $("#tblPlaylist tr").removeClass("rowSelected");
        var rws = tblPlaylist.rows().data();
        for (i in rws) {
            var row = tblPlaylist.row(i);
            var data = row.data();
            if (data[2] === currentVideo) {
                var node = row.node();
                $(node).addClass("rowSelected");
                return;
            }
        }
    }

    var init = function () {
        tblPlaylist = $('#tblPlaylist').DataTable({
            bPaginate: false,
            bInfo: false,
            scrollY: "500px",
            bFilter: false,
            rowReorder: {
                selector: 'tr'
            },
            columnDefs: [
                { targets: 0, visible: false },
                { targets: 1, orderable: false },
                { targets: 2, visible: false }
            ]
        });
        $('#tblPlaylist tbody').on('click', 'tr', function () {
            updatePlayerItem(tblPlaylist.row(this).data());
        });
    }

    var updatePlayerItem = function (item) {
        setPlayerVideo(item[2]);
    }

    var addItem = function (name, path) {
        var rws = tblPlaylist.rows().data();
        for (i in rws) {
            if (rws[i][2] === path) {
                console.log("Contained..");
                return;
            }
        }
        tblPlaylist.row.add([rws.length, name, path]).draw(false);
        if (rws.length === 0) {
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
            if (rws[i][2] === currentVideo) {
                return parseInt(i);
            }
        }
        return -1;
    }

    var nextVideo = function () {
        var nidx = getCurrentVideoIdx() + 1;
        var rws = tblPlaylist.rows().data();
        if (nidx < rws.length) {
            setPlayerVideo(rws[nidx][2]);
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