$(document).ready(function() {
    "use strict";
    document.title = "# of completed solar installations by county: d3 map";

    $(".breadcrumb").nfBreadcrumbs({
        crumbs : [
            { text : "# of completed solar installations by county: d3 map" }
        ]
    });

    var mapperOptions = {
        sourceType : "json",
        level : "county",
        source: "../solardata/installationCountByCounty.json",
        jsonWrapperObjectName: "installationCountByCounty",
        jsonLevelProperty: "county",
        jsonCountProperty: "count",
        colorScheme: "orange"
    };

    $(".map-placeholder").mapViz(mapperOptions);

    var mapperOptionsNewColor = {
        sourceType : "json",
        level : "county",
        source: "../solardata/installationCountByCounty.json",
        jsonWrapperObjectName: "installationCountByCounty",
        jsonLevelProperty: "county",
        jsonCountProperty: "count",
        colorScheme: "orange",
        newColorMapping: true
    };

    $(".test-map-placeholder").mapViz(mapperOptionsNewColor);


});