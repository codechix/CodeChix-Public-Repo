(function($) {

    $.fn.mapViz = function(opts) {

        // given: level (county/zip), sourceType (csv/json), source (http json resource), csvColIndexForLevel, csvColIndexForCount,
        //        jsonWrapperObjectName, jsonLevelProperty, jsonCountProperty,
        //        colorScheme (one of whiteToYellow ,brownToGold , blackToGreen ,darkGreenToLightGreen)
        // when: init -> populate mapDataArray
        // when: render -> drawCaliforniaWithData

        var level = opts.level,
            sourceType = opts.sourceType,
            source = opts.source,
            csvColIndexForLevel = opts.csvColIndexForLevel,
            csvColIndexForCount = opts.csvColIndexForCount,
            jsonWrapperObjectName = opts.jsonWrapperObjectName,//TODO: make this fixed? something like data...
            jsonLevelProperty = opts.jsonLevelProperty,
            jsonCountProperty = opts.jsonCountProperty,
            mapDataArray = {},
            placeWithMaxCount,
            schemes = {},
            colorScheme,
            csvHasHeader = opts.csvHasHeader;

        function init(){
            schemes.whiteToYellow = {zeroFill:"white",maxFill:"#fffc19"};
            schemes.brownToGold = {zeroFill: "#582f0a",maxFill:"#ffbf34"};
            schemes.blackToGreen = {zeroFill: "#151827",maxFill:"#B4FF47"};
            schemes.darkGreenToLightGreen = {zeroFill: "#2d6509",maxFill:"#00FF00"};

            colorScheme = opts.colorScheme ? schemes[opts.colorScheme] : schemes["whiteToYellow"];

            if (sourceType === "csv") {
                var deferred = $.Deferred();
                $.when(getCsvData()).then(function(lines){
                    var allLines = lines.split(/\r\n|\n/);
                    if (csvHasHeader) {
                        allLines.shift();               //remove optional header rec
                    }
                    _.each(allLines,function(line){
                        var lineElements = line.splitCSV();
                        mapDataArray[lineElements[csvColIndexForLevel]] = Number(lineElements[csvColIndexForCount]);
                    });
                    placeWithMaxCount = _.max(allLines,function(line){
                        var lineElements = line.splitCSV();
                        return Number(lineElements[csvColIndexForCount]);
                    });
                    deferred.resolve();
                });
                return deferred.promise();
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


        function getCsvData(){
            return $.get(source).promise();
        }

        function getJsonData(){
            return $.getJSON(source).promise();
        }

        function render(mapPlaceholderElement){
            init().done(function(){
                drawCalifornia(mapPlaceholderElement);
            });
        }

        function getAreaId(){
            return (level === "zip") ? "GEOID10" : "NAME";
        }

        function drawCalifornia(containerElement){
            
            var width=800,height=1200,svg,projection,path,zip,
                jsonMapFile = (level === "zip") ? "ca_zipcodes.json" : "../solardata/ca_counties_name.json";  //defaults to county level unless zip specified.
            
            projection = d3.geo.albers()
                .rotate([122,0])            //rotate from 0 longitude over to 122, where CA is
                .center([0,38])             //center the projection around 38 latitude
                .parallels([32,42])
                .scale(5000)
                .translate([250,370]);      //The translation offset determines the pixel coordinates of the projection’s center.

            path = d3.geo.path().projection(projection);

            svg=d3.select(containerElement.selector).append("svg")
                .attr("width",width)
                .attr("height",height);

            svg.append("rect")
                .attr("fill","white")
                .attr("width","100%")
                .attr("height","100%");

            d3.json(jsonMapFile,function(errors,mapData){
                var featureName = (level === "zip") ? "ca_zipcodes" : "ca_counties",
                    areas = topojson.feature(mapData, mapData.objects[featureName]);

                svg.append("path")
                    .datum(areas)
                    .attr("class","area-nofill")
                    .attr("fill",colorScheme.zeroFill)
                    .attr("stroke","gray")
                    .attr("stroke-linejoin","round")
                    .attr("stroke-width",0.2)
                    .attr("d",path);

                svg.selectAll(".area-nofill")
                    .data(areas.features)
                    .enter().append("path")
                    .attr("class",function(d){
                        if ( mapDataArray[d.properties[getAreaId()]] > 0){
                            return "area-fill";
                        } else {
                            return "area-nofill";
                        }
                    })
                    .attr("d",path);

                svg.selectAll(".area-nofill")
                    .attr("fill",colorScheme.zeroFill);

                svg.selectAll(".area-fill")
                    .attr("fill",colorScheme.maxFill)
                    .attr("fill-opacity",function(d){
                        var areaId = d.properties[getAreaId()],
                            opacityFactor = (mapDataArray[areaId] > 0) ? mapDataArray[areaId] / placeWithMaxCount.count : 0;
                        return opacityFactor;
                    });

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