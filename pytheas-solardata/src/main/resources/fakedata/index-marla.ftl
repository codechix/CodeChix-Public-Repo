<#macro body>

    <#import "/layout/bootstrap/simplepage.ftl" as layout />

    <@layout.pagelayout title="More d3">

    <!-- Move your JavaScript code to an include file -->
    <script type="text/javascript">
    <#include "d3-index-marla.js"/>

    </script>
    <div id="welcome-message"">${message}</div>
    <div id="chart">
    </div>

    <div id="star" class="temporary" style="float:left;background-color: white;margin-left: 100px;">
        <svg width="300" height="200">
            <polygon points="100,10 40,180 190,60 10,60 160,180"
                     style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;"/>
        </svg>
    </div>

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

    <svg class="chart-svg"></svg>
    </@layout.pagelayout>

</#macro>
