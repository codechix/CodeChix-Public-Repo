$(document).ready(function() {
    "use strict";
    document.title = "Fakedata Explorer - D3";

    $(".breadcrumb").nfBreadcrumbs({
        crumbs : [
            { text : "d3" }
        ]
    });

    var topZipCodes = [93103, 94103, 95103, 96103, 97103],
    topIncentives = getFakeData(),
    chartScale = d3.scale.linear()
        .domain([0, d3.max(topIncentives)])
        .range([0, 500]),
    width = 500,
    barHeight = 20,
    chartSvg =d3.select(".chart-svg")
        .attr("width", width)
        .attr("height", barHeight * topIncentives.length);

    /*========= svg bar chart */
    var bar = chartSvg.selectAll("g")
        .data(topIncentives)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", chartScale)
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function(d) { return chartScale(d) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d; });

    /*========== html bar chart */
    d3.select("#chart")
        .selectAll("div")
        .data(topIncentives)
        .enter().append("div")
        .style("width", function(d) { return chartScale(d)  + "px"; })
        .text(function(d) { return d; });

    var chart = d3.select(".chart-svg")
        .attr("width",width)
        .attr("height",barHeight * topIncentives.length);

    var bar = chart.selectAll("g")
        .data(topIncentives)
        .enter().append("g")
        .attr("transform", function(d,i){return "translate(0," + i * barHeight + ")"; }) ;

    bar.append("rect")
        .attr("width",chartScale)
        .attr("height",barHeight -1);

    bar.append("text")
        .attr("x", function(d){return chartScale(d) -3; })
        .attr("y", barHeight /2)
        .attr("dy", ".35em")
        .text(function(d){return d;}) ;

    function getFakeData(){ //todo - replace with call to service that provides it
       var fakeStuff = $("#fake-stuff").text();
       return fakeStuff.replace("[","").replace("]","").split(",");
    }

    var jsonZips = {
            children: [
                {zipCode: "90638",
                    value: 651},
                {zipCode: "93004",
                    value: 139},
                {zipCode: "93003",
                    value: 115},
                {zipCode: "95120",
                    value: 80}
            ]}
        ;

    //=========== trying circle pack layout

    var packWidth = 960,packHeight = 500,
        format = d3.format(",d"),
        fill = d3.scale.category10(),
        bubbleScale=d3.scale.linear()
            .domain([0, d3.max(jsonZips.children,function(d){return d.value;})])
            .range([0, packHeight]);

    var pack = d3.layout.pack()
        .sort(d3.descending)
        .size([packWidth, packHeight])
        .padding(1.5);

    var svg = d3.select("#next-chart").append("svg")
        .attr("width", packWidth)
        .attr("height", packHeight);

    var node = svg.data([jsonZips]).selectAll(".node")
        .data(pack.nodes)
        .enter().append("g")
            .attr("transform", function(d) {
                return "translate(" + bubbleScale(d.x) + "," + bubbleScale(d.y) +")";
            });

        node.append("circle")
        .attr("class", "node")
        .attr("r", function(d) {
            return bubbleScale(d.r);
        })
        .style("fill", function(d) {
            return fill(d.value);
        });

    node.append("title")
        .text(function(d) {
            return d.zipCode + ": " + format(d.value);
        });

    node.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".3em")
        .text(function(d) {
            return d.zipCode;
        });

    //============= Just plain Yellow Circles

    var circleChartScale = d3.scale.linear()
        .domain([0, d3.max(jsonZips.children,function(d){return d.value;})])
        .range([0, 500]),
        circlePadding= 5,
        circleChart = d3.select("div#circle-chart").append("svg").attr("width", 1000).attr("height", 500),
        circle = circleChart.selectAll("g")
            .data(jsonZips.children)
            .enter()
            .append("g")
            .attr("transform", function(d, i) {
                var xOffset= parseInt(circlePadding,10) + circleChartScale(d.value)/2;
                return "translate(" + xOffset + ",250)";
            });

    circle.append("circle")
//        .attr("cx", function (d) {
//            return circleChartScale(d.value);
//        })
//        .attr("cy", 25)
        .attr("r", function (d) {
            return circleChartScale(d.value)/2;
        })
        .attr("fill", "yellow")
        .attr("stroke", "orange")
        .attr("stroke-width", 5);

    circle.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", function(d){return -20;})
        .attr("fill", "black")
        .text(function(d) {
            return d.zipCode;
        });




});