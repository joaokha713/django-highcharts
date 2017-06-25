(function ($, palette) {
    function setChart2(data) {
        var canvas = document.getElementById("myChart");
        var ctx = canvas.getContext("2d");
        var lastend = 0;
        var myTotal = 0;
        var myPalette = palette.listSchemes('tol-rainbow')[0](10);

        for (var e = 0; e < data.length; e++) {
            myTotal += data[e];
        }

        for (var i = 0; i < data.length; i++) {
            ctx.fillStyle = '#' + myPalette[i];
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (data[i] / myTotal)), false);
            ctx.lineTo(canvas.width / 2, canvas.height / 2);
            ctx.fill();
            lastend += Math.PI * 2 * (data[i] / myTotal);
        }
    }

    var endpoint = '/api/chart/data/';
    var defaultData = [];
    var labels = [];
    $.ajax({
        method: "GET",
        url: endpoint,
        success: function (data) {
            labels = data.labels;
            setChart2(data.values);
        },
        error: function (error_data) {
            console.log("error");
            console.log(error_data);
        }
    })
})(jQuery, palette);
