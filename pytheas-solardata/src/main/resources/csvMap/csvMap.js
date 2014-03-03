$(document).ready(function() {
    "use strict";
    document.title = "Unemployment Rates by County (December 2013)";

    $(".breadcrumb").nfBreadcrumbs({
        crumbs : [
            { text : "Unemployment Rates by County (December 2013)" }
        ]
    });

    var mapperOptions = {
        sourceType: "csv",
        level: "county",
        csvColIndexForLevel: 0,
        csvColIndexForCount: 5,
        csvHasHeader: true,
        source: "../solardata/county_unemployment_rates.csv",
        colorScheme: "purple",
        newColorMapping: true
    };

    $(".map-placeholder").mapViz(mapperOptions);

});