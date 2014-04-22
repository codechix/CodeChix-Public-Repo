$(document).ready(function() {
    "use strict";
    document.title = "Fakedata Explorer - D3";

    $(".breadcrumb").nfBreadcrumbs({
        crumbs : [
            { text : "d3" }
        ]
    });

    function firstBarChart(){
        var chartScale = d3.scale.linear()
            .domain([0, d3.max(getFakeData())])
            .range([0, 500]),
        width = 500,
        barHeight = 20,
        chartPlace = $(".chart-placeholder"),
        chartSvg;

        chartPlace.append("svg");

        chartSvg =d3.select(chartPlace.find(".chart-svg") )
            .attr("width", width)
            .attr("height", barHeight * getFakeData().length);

        /*========= svg bar chart */
        var bar = chartSvg.selectAll("g")
            .data(getFakeData())
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
    }

    function getFakeData(){ //todo - replace with call to service that provides it
        return [5000,4000,3000,2000,1000];
    }

    function secondBarChart(){
        d3.select("#chart")
            .selectAll("div")
            .data(getFakeData())
            .enter().append("div")
            .style("width", function(d) { return chartScale(d)  + "px"; })
            .text(function(d) { return d; });

        var chart = d3.select(".chart-svg")
            .attr("width",width)
            .attr("height",barHeight * getFakeData().length);

        var bar = chart.selectAll("g")
            .data(getFakeData())
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
    }

    function getInstallationsByZip(){
        var notifier=$(".notifier");
        notifier.append("<span>retrieving data...</span>").show();
        $.ajax({
            url: "../solardata/installationCountByZip.json",
            success: function(data,textStatus,jqXHR){
                var serverData = {};
               serverData.children = _.map(data.installationCountByZip,function(entry){
                    return {zipCode:entry.zipCode,
                            value:entry.count};
                })
                doPack(serverData);
            },
            failure: function(jqXHR, textStatus, errorThrown){
                var notifier=$(".notifier");
                notifier.hide();
                notifier.empty();
                notifier.attr("background-color","firebrick");
                notifier.attr("color","white");
                notifier.append("<span> STATUS: "+textStatus+ "&nbsp; ERROR: " + errorThrown +"</span>").show();
            }
        });
    }

    function doPack(data){
        var notifier=$(".notifier");
        notifier.hide();
        notifier.empty();
        notifier.append("<span>got " +data.children.length + " zipcode records</span>").show();
        notifier.fadeOut(4000);
        circlePackLayout(data,1500,1000);
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

    function circlePackLayout(zipData,w,h) {

        var packWidth = w,packHeight = h,
            format = d3.format(",d"),
            fill = d3.scale.category10(),
            bubbleScale=d3.scale.linear()
                .domain([0, d3.max(zipData.children,function(d){return d.value;})])
                .range([0, packHeight]);

        var pack = d3.layout.pack()
            .sort(d3.descending)
            .size([packWidth, packHeight])
            .padding(1.5);

        var svg = d3.select("#next-chart").append("svg")
            .attr("width", packWidth)
            .attr("height", packHeight);

        var node = svg.data([zipData]).selectAll(".node")
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
    }
    //============= Just plain Yellow Circles

    function yellowCircles(){

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
    }

    //circlePackLayout(jsonZips,960,500);
    yellowCircles();
    getInstallationsByZip();

});