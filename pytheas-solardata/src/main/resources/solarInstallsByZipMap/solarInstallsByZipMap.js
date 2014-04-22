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
        level : "zip",
        source: "../solardata/installationCountByZip.json",
        jsonWrapperObjectName: "installationCountByZip",
        jsonPropertyNameForArea: "zipCode",
        jsonPropertyNameForQuantity: "count",
        colorScheme: "green",
        legendTitle: "# of solar installations"
    };

    $(".map-placeholder").mapViz(mapperOptions);


});