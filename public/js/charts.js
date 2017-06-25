(function ($, palette) {
    function setChart2(labels, data, colors) {
        var canvas = document.getElementById("myChart");
        var ctx = canvas.getContext("2d");
        var lastend = 0;
        var myTotal = 0;
        // if colors is undefined, use palette
        var isUsingPalette = !colors;
        var myPalette = colors || palette.listSchemes('tol-rainbow')[0](10);

        for (var e = 0; e < data.length; e++) {
            myTotal += data[e];
        }

        // Draw Arcs
        var width = canvas.width;
        var height = canvas.height;
        var centerX = width / 2;
        var centerY = height / 2;
        var radius = Math.min(width / 2 - 100, height / 2 - 100);
        var outerRadius = radius + 50;

        for (var i = 0; i < data.length; i++) {
            ctx.fillStyle = (isUsingPalette ? '#' : '') + myPalette[i];
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, lastend, lastend + (Math.PI * 2 * (data[i] / myTotal)), false);
            ctx.fill();
            lastend += Math.PI * 2 * (data[i] / myTotal);
        }

        // Draw Labels
        lastend = 0;
        for (var i = 0; i < data.length; i++) {
            var radian = lastend + Math.PI * 2 * (data[i] / myTotal / 2);
            var sin = Math.sin(-(radian - Math.PI / 2));
            var cos = Math.cos(radian - Math.PI / 2);
            var x = centerX + sin * outerRadius;
            var y = centerY + cos * outerRadius;

            ctx.fillStyle = (isUsingPalette ? '#' : '') + myPalette[i];
            ctx.textAlign = 'center';
            ctx.fillText(labels[i], x, y);
            lastend += Math.PI * 2 * (data[i] / myTotal);

            // draw line to legend
            ctx.beginPath();
            ctx.moveTo(centerX + sin * radius, centerY + cos * radius);
            ctx.lineTo(centerX + sin * (radius + 30), centerY + cos * (radius + 30));
            ctx.stroke();
        }
    }

    var endpoint = '/api/chart/data/';
    var defaultData = [];
    $.ajax({
        method: "GET",
        url: endpoint,
        success: function (data) {
            setChart2(data.labels, data.values, data.colors);
        },
        error: function (error_data) {
            console.log("error");
            console.log(error_data);
        }
    })
})(jQuery, palette);
