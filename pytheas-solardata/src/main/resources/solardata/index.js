$(document).ready(function() {
    "use strict";
    document.title = "SolarData Explorer";

    $(".breadcrumb").nfBreadcrumbs({
        crumbs : [
            { text : "Countries" }
        ]
    });

    //"Application Number","Incentive Amount","Total Cost","Host Customer Physical Zip Code"

    var oTable = $('#solarstats-table').dataTable( {
        "aoColumns": [
            { "sTitle": "applicationId",  "mDataProp" : "application-id", "sWidth" : "10%", "sDefaultContent": "-" },
            { "sTitle": "incentiveAmount",     "mDataProp" : "incentive-amount", "sWidth" : "10%", "sDefaultContent": "-" },
            { "sTitle": "totalCost",     "mDataProp" : "total-cost", "sWidth" : "10%", "sDefaultContent": "-" },
            { "sTitle": "zipCode",     "mDataProp" : "zipcode", "sWidth" : "10%", "sDefaultContent": "-" }
        ],
        "sAjaxDataProp": "installations",
        "sAjaxSource": "list",
        "bDestroy"       : true,
        "bAutoWidth"     : false,
        "bStateSave"     : true,
        "bPaginate"      : false,
        "bLengthChange"  : false
    });
});