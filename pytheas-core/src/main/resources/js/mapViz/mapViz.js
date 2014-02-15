(function($) {

    $.fn.mapViz = function(opts) {

        // given: level (county/zip), sourceType (csv/json), source (http json resource), csvColIndexForLevel, csvColIndexForCount,
        //        jsonWrapperObjectName, jsonLevelProperty, jsonCountProperty
        // when: init -> populate mapDataArray
        // when: render -> drawCaliforniaWithData
        //TODO: styling. Color schemes.

        var level = opts.level,
            sourceType = opts.sourceType,
            source = opts.source,
            csvColIndexForLevel = opts.csvColIndexForLevel,
            csvColIndexForCount = opts.csvColIndexForCount,
            jsonWrapperObjectName = opts.jsonWrapperObjectName,
            jsonLevelProperty = opts.jsonLevelProperty,
            jsonCountProperty = opts.jsonCountProperty,
            mapDataArray = {},
            placeWithMaxCount;

        function init(){
            if (sourceType === "csv") {
//                initCsv();
            }
            if (sourceType === "json") {
                var deferred = $.Deferred();
                $.when(getJsonData()).then(function(data){
                    _.each(data[jsonWrapperObjectName],function(element){
                        mapDataArray[element[jsonLevelProperty]] = element[jsonCountProperty];
                    });
                    placeWithMaxCount = _.max(data[jsonWrapperObjectName],function(data){
                        return data[jsonCountProperty];
                    });
                    deferred.resolve();
                });
                return deferred.promise();
            }
       }

        function render(mapPlaceholderElement){
            init().done(function(){
                drawCalifornia(mapPlaceholderElement);
            });
        }

        function getJsonData(){
            return $.getJSON(source).promise();
        }

        function getAreaId(){
            return (level === "zip") ? "GEOID10" : "NAME";
        }

        function drawCalifornia(containerElement){
            
            var width=800,height=1600,svg,projection,path,zip,
                jsonMapFile = (level === "zip") ? "ca_zipcodes.json" : "ca_counties_name.json";  //defaults to county level unless zip specified.
            
            projection = d3.geo.albers()
                .center([0,42])
                .rotate([126,0])
                .parallels([32,42])
                .scale(5000)
                .translate([200,400]);

            path = d3.geo.path().projection(projection);

            svg=d3.select(containerElement.selector).append("svg")
                .attr("width",width)
                .attr("height",height);

            d3.json(jsonMapFile,function(errors,mapData){
                var featureName = (level === "zip") ? "ca_zipcodes" : "ca_counties",
                    areas = topojson.feature(mapData, mapData.objects[featureName]);

                svg.append("path")
                    .datum(areas)
                    .attr("class","area-nosolar")
                    .attr("d",path);

                svg.selectAll(".area-nosolar")
                    .data(areas.features)
                    .enter().append("path")
                    .attr("class",function(d){
                        if ( mapDataArray[d.properties[getAreaId()]] > 0){
                            return "area-solar";
                        } else {
                            return "area-nosolar";
                        }
                    })
//                .attr("data-zip",function(d){return d.properties.NAME;})
                    .attr("d",path);

                svg.selectAll(".area-solar")
                    .attr("fill-opacity",function(d){
                        var areaId = d.properties[getAreaId()],
                            opacityFactor = (mapDataArray[areaId] > 0) ? mapDataArray[areaId] / placeWithMaxCount.count : 1;
                        return opacityFactor;
                    });

                svg.append("path")
                    .datum(topojson.mesh(mapData, mapData.objects[featureName], function(a, b) { return a !== b; }))
                    .attr("class", "area-boundary")
                    .attr("d", path);

                svg.selectAll("text")
                    .data(areas.features)
                    .enter().append("text")
                    .attr("transform", function(d) {
                        return "translate(" + path.centroid(d) + ") scale(0.3)";
                    })
                    .attr("dy", ".35em")
                    .text(function(d) {
                        return d.properties[getAreaId()];
                    });
            });
        }

        return render(this);
    }

}(jQuery));