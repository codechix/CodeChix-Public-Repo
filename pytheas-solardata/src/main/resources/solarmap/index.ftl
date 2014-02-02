<#macro body>

<#import "/layout/bootstrap/simplepage.ftl" as layout />

<@layout.pagelayout title="# of completed solar installations by zipcode: d3 map">

<!-- Move your JavaScript code to an include file -->
<script type="text/javascript">
<#include "solarmap.js"/>

</script>
<!-- Customize your styles here -->
<style>

</style>

<div class="chart-placeholder"></div>
<p>NEXT CHART HERE</p>
<br>
<div id="next-chart"></div>

<p>Circles</p>
<br>
<div id="circle-chart"></div>

</@layout.pagelayout>

</#macro>
