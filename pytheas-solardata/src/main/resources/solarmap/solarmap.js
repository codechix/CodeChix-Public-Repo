$(document).ready(function() {
    "use strict";
    document.title = "# of completed solar installations by zipcode: d3 map";

    $(".breadcrumb").nfBreadcrumbs({
        crumbs : [
            { text : "# of completed solar installations by zipcode: d3 map" }
        ]
    });

    function drawCalifornia(containerSelector){
        var width=800,height=1600,svg,projection,path,zip;

        projection = d3.geo.albers()
            .center([0,42])
            .rotate([126,0])
            .parallels([32,42])
            .scale(5000)
            .translate([200,400]);

        path = d3.geo.path().projection(projection);

        svg=d3.select(containerSelector).append("svg")
            .attr("width",width)
            .attr("height",height);

        d3.json("ca_zipcodes.json",function(errors,zips){
            var zipcodeAreas = topojson.feature(zips, zips.objects.ca_zipcodes);

            svg.append("path")
                .datum(zipcodeAreas)
                .attr("class","zipcode")
                .attr("d",path);

            svg.append("path")
                .datum(topojson.mesh(zips, zips.objects.ca_zipcodes, function(a, b) { return a !== b; }))
                .attr("class", "zipcode-boundary")
                .attr("d", path);

            svg.selectAll("text")
                .data(zipcodeAreas.features)
                .enter().append("text")
                .attr("transform", function(d) {
                    return "translate(" + path.centroid(d) + ") scale(0.3)";
                })
                .attr("dy", ".35em")
                .text(function(d) {
                    return d.properties.GEOID10;
                });
        });
    }

    function getInstallationsByZip(callback){
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
                callback(serverData);
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

    //getInstallationsByZip(doPack);
    drawCalifornia(".map-placeholder");

});