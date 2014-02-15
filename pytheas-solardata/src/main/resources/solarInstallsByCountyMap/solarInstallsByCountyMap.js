$(document).ready(function() {
    "use strict";
    document.title = "# of completed solar installations by zipcode: d3 map";

    $(".breadcrumb").nfBreadcrumbs({
        crumbs : [
            { text : "# of completed solar installations by zipcode: d3 map" }
        ]
    });

    var mapperOptions = {
        sourceType : "json",
        level : "county",
        source: "../solardata/installationCountByCounty.json",
        jsonWrapperObjectName: "installationCountByCounty",
        jsonLevelProperty: "county",
        jsonCountProperty: "count"
    };

    $(".map-placeholder").mapViz(mapperOptions);

});