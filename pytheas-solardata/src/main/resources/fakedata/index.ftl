<#macro body>

    <#import "/layout/bootstrap/simplepage.ftl" as layout />

    <@layout.pagelayout title="This is where we play with d3">

    <!-- Move your JavaScript code to an include file -->
    <script type="text/javascript">
    <#include "d3-index.js"/>
    <#include "underscore-min.js"/>
    <#--<#include "${RequestContext.pathToRoot}res/js/d3/d3.v2.min.js"/>-->
    </script>

    <div class="notifier" style="display:none;"></div>
    <div class="marla-link"">
    <a href="marla">Marla's page</a>
    </div>

    <div id="chart">
    </div>

    <!-- Customize your styles here -->
    <style>
        div.marla-link {
            text-align: center;
            background-color: darkorange;
            max-width: 30%;
            margin-left: 30%;
            margin-bottom: 20px;
            padding-top: 20;
            padding-bottom: 20;
            color: white;
            font-weight: bolder;
            font-size: 2em;
        }
        div.dataTables_filter label {
            float: left;
            margin-bottom: 15px;
            max-width: 30%;
            margin-left: 30%;
        }

        div.notifier {
            background-color: lightgreen;
            border: solid;
            padding: 3em;
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

    <div class="chart-placeholder"></div>
    <p>NEXT CHART HERE</p>
    <br>
    <div id="next-chart"></div>

    <p>Circles</p>
    <br>
    <div id="circle-chart"></div>
    <!-- Define a table -->
    <table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered dataTable" id="solarstats-table" style="width:50%;">
    </table>

    </@layout.pagelayout>

</#macro>
