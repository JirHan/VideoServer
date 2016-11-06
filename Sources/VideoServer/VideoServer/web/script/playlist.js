window.Vsrv = window.Vsrv || {};

Vsrv.Playlist = (function () {

    var tblPlaylist;
    var currIdx = 0;

    var init = function () {
        tblPlaylist = $('#tblPlaylist').DataTable({
            "bPaginate": false,
            "bInfo": false,
            "scrollY": "500px",
            "bFilter": false,
            "bSort" : false,
            "select": true,
            "rowReorder": true,
        });
        $('#tblPlaylist tbody').on('click', 'tr', function () {
            playItem(tblPlaylist.row(this).data());
        });
    }

    var playItem = function (item) {
        Vsrv.Player.setVideoSrc(item[1]);
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
            Vsrv.Player.fileAdded();
        }
    }

    var getItemPath = function(idxOffset) {
        var rws = tblPlaylist.rows().data();
        if((currIdx + idxOffset) < 0 || (currIdx + idxOffset) >= rws.length){
            return null;
        } else {
            currIdx += idxOffset;
            tblPlaylist.rows().every(function(idx, tableLoop, rowLoop){
                if(idx == currIdx){
                    $(this).toggleClass('row_selected');
                }
            });
            return rws[currIdx][1];
        }
    }

    var setPlaying = function (path) {
        var rws = tblPlaylist.rows().data();
        for (i in rws) {
            if (rws[i][1] === path) {
                var t = rws[i];
            }
        }
    }

    return {
        init: init,
        addItem: addItem,
        getItemPath: getItemPath,
        setPlaying: setPlaying
    };

})();