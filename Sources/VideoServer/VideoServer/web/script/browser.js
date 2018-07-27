window.Vsrv = window.Vsrv || {};

Vsrv.Browser = (function () {
    
    var clickDisabled = false;
    var CurrDirChain = [];
    var listUrl = "list?pwd={0}&path=".format(getURLParam("pwd"));
    var tblBrowser;

    var updateHash = function () {
        window.location.hash = JSON.stringify(CurrDirChain);
    }

    var processHash = function () {
		var hash = decodeURIComponent(window.location.hash);
        if (hash != "") {
            CurrDirChain = JSON.parse(hash.substring(1));
        } else {
            CurrDirChain = [];
        }
        $("#path").html("./" + getCurrentDir());
        tblBrowser.ajax.url(listUrl + getCurrentDir()).load();
    }

    var init = function () {
        tblBrowser = $('#tblBrowser').DataTable({
            bPaginate: false,
            processing: true,
            bInfo : false,
            ajax: {
                url: listUrl + getCurrentDir(),
                dataSrc: function (d)
                {
                    return d;
                },
            },
            columns: [
                { data: "type" },
                { data: "name" }
            ],
            scrollY: "75vh",
            language: {
                "emptyTable": "No Files"
            }
        });
        $('#tblBrowser tbody').on('click', 'td', function () {
            if (!clickDisabled && this.cellIndex === 1) {
                handleMulticlick();
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

    var handleMulticlick = function(){
        clickDisabled = true;
        setTimeout(function () { clickDisabled = false; }, 300);
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