$(document).ready(function() {
    "use strict";
    document.title = "Contributions to Candidate/Officeholder Committees (CA: 2013 election cycle)";

    $(".breadcrumb").nfBreadcrumbs({
        crumbs : [
            { text : "Contributions to Candidate/Officeholder Committees (CA: 2013 election cycle)" }
        ]
    });

    var mapperOptions = {
        sourceType : "json",
        level : "county",
        source: "../candidateDonations/donationTotalByCounty.json",
        jsonWrapperObjectName: "donationTotalByCounty",
        jsonLevelProperty: "county",
        jsonCountProperty: "amount",
        colorScheme: "blue",
        legendTitle: "Donation amount ($)"
    };

    $(".map-placeholder").mapViz(mapperOptions);

});