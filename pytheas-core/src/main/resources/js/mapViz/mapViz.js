(function($) {

    $.fn.mapViz = function(opts) {

        // given: level (county/zip), sourceType (csv/json), source (http json resource), csvColIndexForLevel, csvColIndexForCount,
        //        jsonWrapperObjectName, jsonLevelProperty, jsonCountProperty
        // when: init -> populate mapDataArray
        // when: render -> drawCaliforniaWithData

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
                        return data.count[jsonCountProperty];
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

        function drawCalifornia(containerElement){
            
            var width=800,height=1600,svg,projection,path,zip,
                jsonMapFile = (level === "zip") ? "ca_zipcodes_2.json" : "ca_counties_name.json";  //defaults to county level unless zip specified. 
            
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

            d3.json(jsonMapFile,function(errors,zips){
                var counties = topojson.feature(zips, zips.objects.ca_counties);  //todo - feature name will not be ca_counties for the zipcode - need to make this variable

                svg.append("path")
                    .datum(counties)
                    .attr("class","county-nosolar")
                    .attr("d",path);

                svg.selectAll(".county-nosolar")
                    .data(counties.features)
                    .enter().append("path")
                    .attr("class",function(d){
                        if ( mapDataArray[d.properties.NAME] > 0){
                            return "county-solar";
                        } else {
                            return "county-nosolar";
                        }
                    })
//                .attr("data-zip",function(d){return d.properties.NAME;})
                    .attr("d",path);

                svg.selectAll(".county-solar")
                    .attr("fill-opacity",function(d){
                        var county = d.properties.NAME,
                            opacityFactor = (mapDataArray[jsonLevelProperty] > 0) ? mapDataArray[jsonLevelProperty] / placeWithMaxCount.count : 1;
                        return opacityFactor;
                    });

                svg.append("path")
                    .datum(topojson.mesh(zips, zips.objects.ca_counties, function(a, b) { return a !== b; }))          //todo - feature name will not be ca_counties for the zipcode - need to make this variable
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

        return render(this);
    }

}(jQuery));