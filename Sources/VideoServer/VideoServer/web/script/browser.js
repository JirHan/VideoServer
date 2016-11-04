window.Vsrv = window.Vsrv || {};

Vsrv.Browser = (function () {
    
    var CurrDirChain = [];
    var listUrl = "list?path=";
    var tblBrowser;

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
            "fnDrawCallback": function () {
                var folderUp = '<tr><td class="folderUp"></td><td class="folderUp">..</td></tr>';
                $('#tblBrowser tbody').prepend(folderUp);
            },
            "language": {
                "emptyTable": "No Files"
            }
        });
        $('#tblBrowser tbody').on('click', 'td', function () {
            if (this.className === "folderUp") {
                folderUp();
            } else if(this.cellIndex === 1){
                var item = tblBrowser.row(this).data();
                itemClick(item.type, item.name);
            }
        });
    }

    var folderUp = function () {
        if (CurrDirChain.length > 0) {
            CurrDirChain.pop();
            $("#path").html("./" + getCurrentDir());
        }
        tblBrowser.ajax.url(listUrl + getCurrentDir()).load();
    }

    var itemClick = function (type, name) {
        if (type === "D") {
            CurrDirChain.push(name);
            $("#path").html("./" + getCurrentDir());
            tblBrowser.ajax.url(listUrl + getCurrentDir()).load();
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