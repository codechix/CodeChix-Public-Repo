$(document).ready(function() {
    "use strict";
    document.title = "# of completed solar installations by zipcode: d3 map";

    $(".breadcrumb").nfBreadcrumbs({
        crumbs : [
            { text : "# of completed solar installations by zipcode: d3 map" }
        ]
    });

    var installationsByCounty = {},maxNumInstallationsCounty;

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

        d3.json("ca_counties.json",function(errors,zips){
            var counties = topojson.feature(zips, zips.objects.tl_2013_06_cousub);

            svg.append("path")
                .datum(counties)
                .attr("class","county-nosolar")
                .attr("d",path);

            svg.selectAll(".county-nosolar")
                .data(counties.features)
                .enter().append("path")
                .attr("class",function(d){
                    if ( installationsByCounty[d.properties.NAME] > 0){
                        return "county-solar";
                    } else {
                        return "county-nosolar";
                    }
                })
                .attr("data-zip",function(d){return d.properties.NAME;})
                .attr("d",path);

            svg.selectAll(".county-solar")
                .attr("fill-opacity",function(d){
                    var county = d.properties.NAME,
                        opacityFactor = (installationsByCounty[county] > 0) ? installationsByCounty[county] / maxNumInstallationsCounty.count : 1;
                    return opacityFactor;
                });

            svg.append("path")
                .datum(topojson.mesh(zips, zips.objects.tl_2013_06_cousub, function(a, b) { return a !== b; }))
                .attr("class", "county-boundary")
                .attr("d", path);

            svg.selectAll("text")
                .data(counties.features)
                .enter().append("text")
                .attr("transform", function(d) {
                    return "translate(" + path.centroid(d) + ") scale(0.3)";
                })
                .attr("dy", ".35em")
                .text(function(d) {
                    return d.properties.NAME;
                });
        });
    }

    function getInstallationsData(){
        return $.getJSON("../solardata/installationCountByCounty.json").promise();
    }

    $.when(getInstallationsData()).then(function(data){
        _.each(data.installationCountByCounty,function(element){
           installationsByCounty[element.county] = element.count;
        });
        maxNumInstallationsCounty = _.max(data.installationCountByCounty,function(data){
           return data.count;
        });
        drawCalifornia(".map-placeholder");
    });


});