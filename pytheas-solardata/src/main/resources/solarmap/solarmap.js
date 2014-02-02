$(document).ready(function() {
    "use strict";
    document.title = "# of completed solar installations by zipcode: d3 map";

    $(".breadcrumb").nfBreadcrumbs({
        crumbs : [
            { text : "# of completed solar installations by zipcode: d3 map" }
        ]
    });

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

    getInstallationsByZip();

});