<#macro body>

<#import "/layout/bootstrap/simplepage.ftl" as layout />

<@layout.pagelayout title="Completed Solar Installations in California by zipcode">

<!-- Move your JavaScript code to an include file -->
<script type="text/javascript">
<#--<#include "index.js"/>-->
<#include "d3-index.js"/>
</script>

<div id="chart"></div>


<!-- Customize your styles here -->
<style>
    div.dataTables_filter label {
        float: left;
        margin-bottom: 15px;
    }

    #chart div {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }

    .chart-svg  rect {
        fill: steelblue;
    }

    .chart-svg text {
        fill: white;
        font: 10px sans-serif;
        text-anchor: end;
    }

</style>

<svg class="chart"></svg>

<!-- Define a table -->
<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered dataTable" id="solarstats-table" style="width:50%;">
</table>

</@layout.pagelayout>

</#macro>
