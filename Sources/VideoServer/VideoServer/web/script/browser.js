window.Vsrv = window.Vsrv || {};

Vsrv.Browser = (function () {
    
    var CurrDirChain = [];
    var listUrl = "list?path=";
    var tblBrowser;

    var updateHash = function () {
        window.location.hash = JSON.stringify(CurrDirChain);
    }

    var processHash = function () {
        if (window.location.hash != "") {
            CurrDirChain = JSON.parse(window.location.hash.substring(1));
        } else {
            CurrDirChain = [];
        }
        $("#path").html("./" + getCurrentDir());
        tblBrowser.ajax.url(listUrl + getCurrentDir()).load();
    }

    var init = function () {
        tblBrowser = $('#tblBrowser').DataTable({
            "bPaginate": false,
            "bInfo" : false,
            "ajax": {
                "url": listUrl + getCurrentDir(),
                "dataSrc": function (d)
                {
                    return d;
                },
            },
            "columns": [
                { "data": "type" },
                { "data": "name" }
            ],
            "scrollY": "500px",
            "language": {
                "emptyTable": "No Files"
            }
        });
        $('#tblBrowser tbody').on('click', 'td', function () {
            if(this.cellIndex === 1){
                var item = tblBrowser.row(this).data();
                itemClick(item.type, item.name);
            }
        });
        window.onhashchange = function ()
        {
            processHash();
        };
        processHash();
    }

    var folderUp = function () {
        if (CurrDirChain.length > 0) {
            CurrDirChain.pop();
        }
        updateHash();
    }

    var itemClick = function (type, name) {
        if (type === "D") {
            CurrDirChain.push(name);
            updateHash();
        } else if (type === "F" && name.endsWith("mp4")) {
            Vsrv.Playlist.addItem(name, getCurrentDir() + name);
        } else {
            console.log("Unsupported..");
        }
    }

    var getCurrentDir = function () {
        var dir = "";
        for (i in CurrDirChain) {
            dir += CurrDirChain[i] + "/";
        }
        return dir;
    }

    return {
        init: init,
        folderUp: folderUp
    };

})();