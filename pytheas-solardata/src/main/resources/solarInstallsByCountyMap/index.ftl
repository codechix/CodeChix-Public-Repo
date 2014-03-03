<#macro body>

<#import "/layout/bootstrap/simplepage.ftl" as layout />

<@layout.pagelayout title="# of completed solar installations by county: d3 map">

<!-- Move your JavaScript code to an include file -->
<script type="text/javascript">
<#include "solarInstallsByCountyMap.js"/>
</script>


<style>
.heading {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 2em;
    color: #ff7211;
}
.interesting-area {
    margin-top:1em;
}
.interesting-area > span {
    margin-left: 2em;
}

.area-boundary {
    fill: none;
    stroke: gray;
    stroke-linejoin: round;
    stroke-width: 0.2;
}

.area-nosolar {
    fill: #ddbfd1;
}

.area-solar {
    fill: yellow;
}

text {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 10px;
    text-anchor: middle;
}


</style>

<div class="interesting-area">
    <span class="heading">CALIFORNIA COUNTIES</span>
    <div display="inline-block" style="width:1600">
        <div class="map-placeholder" style="float:left"></div>
        <div class="test-map-placeholder" style="float:left"></div>
    </div>
</div>
</@layout.pagelayout>

</#macro>
