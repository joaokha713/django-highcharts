(function ($, Highcharts) {
    var chartConfig = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Test Chart'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Colors',
            colorByPoint: true,
            data: []
        }]
    };

    $(function(){
        $.ajax({
            method: "GET",
            url: '/api/chart/data?format=json',
            success: function(resp) {
                // expect labels and values in resp
                if (!resp || !resp.labels || !resp.values) {
                    console.error('AJAX response does not have correct values');
                    return;
                }
                var data = resp.labels.map(function(label, index) {
                    return {
                        name: label,
                        y: resp.values[index]
                    };
                });
                drawChart(data);
            },
            error: function(err) {
                console.log(err);
            }
        });
    });

    // ============
    function drawChart(data) {
        var newConfig = JSON.parse(JSON.stringify(chartConfig));
        newConfig.series[0].data = data;
        Highcharts.chart('chartContainer', newConfig);
    }


})(jQuery, Highcharts);
