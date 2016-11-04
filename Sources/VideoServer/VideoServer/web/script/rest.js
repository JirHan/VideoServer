window.Vsrv = window.Vsrv || {};

Vsrv.Rest = (function () {

    var get = function (url, success, fail) {
        $.ajax({
            async: true,
            url: url,
            type: "GET",
            success: function (result) {
                //console.log(result);
                if (success) {
                    success(result);
                }
            },
            error: function (xhRequest, ErrorText, thrownError) {
                console.log('xhRequest: ' + xhRequest + "\n");
                console.log('ErrorText: ' + ErrorText + "\n");
                console.log('thrownError: ' + thrownError + "\n");
                if (fail) {
                    fail(xhRequest, ErrorText, thrownError);
                }
            }
        });
    }

    return {
        get: get
    };

})();