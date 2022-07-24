$.getJSON('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json', function (info) {

    var DopingBuff = info.filter(function(item){ return item.Doping !== ""})
    var NoDopingBuff = info.filter(function(item){ return item.Doping === ""})
    var Faster =  info.reduce(function(prev, curr) {  return prev.Seconds < curr.Seconds ? prev : curr;});
		var NoDoping = NoDopingBuff.map(function(item){ return {x: item.Seconds - Faster.Seconds, y: item.Place, Name: item.Name, Year: item.Year , Time: item.Time , Nationality: item.Nationality ,Doping: item.Doping}})
    var Doping = DopingBuff.map(function(item){ return {x: item.Seconds -  Faster.Seconds, y: item.Place, Name: item.Name, Year: item.Year , Time: item.Time , Nationality: item.Nationality,Doping: item.Doping}})
   
function timeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

   Highcharts.chart('container', {
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: 'Zipline'
    },
    subtitle: {
        text: 'FCC - Scatterplot Graph'
    },
    xAxis: {      
        title: {
            enabled: true,
            text: 'Minutes Behind Fastest Time'
        },
        labels: {
            formatter: function() {    
               return timeFormat(this.value);
            }
        },
       reversed: true,
    },
    yAxis: {
        title: {
            text: 'Ranking'
        },
      reversed: true,
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        borderWidth: 1
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: ' Name: {point.Name}<br> Year:{point.Year}<br>Time:{point.Time}<br>Nationality:{point.Nationality}<br>Details:{point.Doping}'
            }
        }
    },
    series: [{
        name: 'No Doping',
        color: 'rgba(223, 83, 83, .5)',
        data: NoDoping

    }, {
        name: 'Doping',
        color: 'rgba(119, 152, 191, .5)',
        data: Doping
    }]
});


});