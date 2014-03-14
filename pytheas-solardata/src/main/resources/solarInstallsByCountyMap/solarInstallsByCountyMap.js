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
        colorScheme: "orange",
        legendTitle: "# of solar installations"
    };

    $(".map-placeholder").mapViz(mapperOptions);

});