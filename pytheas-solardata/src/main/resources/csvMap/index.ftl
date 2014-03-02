<#macro body>

<#import "/layout/bootstrap/simplepage.ftl" as layout />

<@layout.pagelayout title="Unemployment Rates by County (December 2013)">

<!-- Move your JavaScript code to an include file -->
<script type="text/javascript">
<#include "csvMap.js"/>
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


text {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 10px;
    text-anchor: middle;
}


</style>

<div class="interesting-area">
    <span class="heading">csv data in map</span>
    <div class="map-placeholder">
    </div>
</div>
</@layout.pagelayout>

</#macro>
