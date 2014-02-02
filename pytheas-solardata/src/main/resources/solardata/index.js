$(document).ready(function() {
    "use strict";
    document.title = "CA Solar Installations List";

    $(".breadcrumb").nfBreadcrumbs({
        crumbs : [
            { text : "CA Solar Installations List" }
        ]
    });



    //"Application Number","Incentive Amount","Total Cost","Host Customer Physical Zip Code"

    var oTable = $('#solarstats-table').dataTable( {
        "aoColumns": [
            { "sTitle": "applicationId", "mDataProp" : "applicationId", "sWidth" : "10%", "sDefaultContent": "-" },
            { "sTitle": "incentiveAmount", "mDataProp" : "incentiveAmount", "sWidth" : "10%", "sDefaultContent": "-" },
            { "sTitle": "totalCost", "mDataProp" : "totalCost", "sWidth" : "10%", "sDefaultContent": "-" },
            { "sTitle": "zipCode", "mDataProp" : "zipCode", "sWidth" : "10%", "sDefaultContent": "-" }
        ],
        "sAjaxDataProp": "solarInstallations",
        "sAjaxSource": "list",
        "bDestroy"       : true,
        "bAutoWidth"     : false,
        "bStateSave"     : true,
        "bPaginate"      : false,
        "bLengthChange"  : false
    });
});