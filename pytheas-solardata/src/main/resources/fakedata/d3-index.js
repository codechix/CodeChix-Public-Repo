$(document).ready(function() {
    "use strict";
    document.title = "Fakedata Explorer - D3";

    $(".breadcrumb").nfBreadcrumbs({
        crumbs : [
            { text : "d3" }
        ]
    });

    var topZipCodes = [93103, 94103, 95103, 96103, 97103],
    topIncentives = [5000, 4000, 3000, 2000, 1000 ],
    chartScale = d3.scale.linear()
        .domain([0, d3.max(topIncentives)])
        .range([0, 500]),
    width = 500,
    barheight = 20;

    d3.select("#chart")
        .selectAll("div")
        .data(topIncentives)
        .enter().append("div")
        .style("width", function(d) { return chartScale(d)  + "px"; })
        .text(function(d) { return d; });

    var chart = d3.select(".chart-svg")
        .attr("width",width)
        .attr("height",barheight * topIncentives.length);

    var bar = chart.selectAll("g")
        .data(topIncentives)
        .enter().append("g")
        .attr("transform", function(d,i){return "translate(0," + i * barHeight + ")"; }) ;

    bar.append("rect")
        .attr("width",chartScale)
        .attr("height",barheight -1);

    bar.append("text")
        .attr("x", function(d){return chartScale(d) -3; })
        .attr("y", barheight /2)
        .attr("dy", ".35em")
        .text(function(d){return d;}) ;

    function getFakeData(){
        var fakeStuff = $("#fake-stuff").text();
        var fakeArray = fakeStuff.replace("[").replace("]").split(",");
       $("#chart").text(fakeArray);
    }
});