$(document).ready(function() {
    "use strict";
    document.title = "# of completed solar installations by county: d3 map";

    $(".breadcrumb").nfBreadcrumbs({
        crumbs : [
            { text : "# of completed solar installations by county: d3 map" }
        ]
    });

    var mapperOptions = {
        sourceType: "csv",
        level: "county",
        csvColIndexForLevel: 0,
        csvColIndexForCount: 5,
        csvHasHeader: true,
        source: "county_unemployment_rates.csv",
        colorScheme: "brownToGold"     //not very appropriate actually. get a better one.
    };

    $(".map-placeholder").mapViz(mapperOptions);

});