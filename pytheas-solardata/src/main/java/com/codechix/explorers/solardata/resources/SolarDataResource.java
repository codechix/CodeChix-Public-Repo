package com.codechix.explorers.solardata.resources;

import com.codechix.explorers.solardata.installation.InstallationBuilder;
import com.codechix.explorers.solardata.installation.SolarInstallation;
import com.google.common.collect.HashMultiset;
import com.google.common.collect.Multiset;
import com.google.common.collect.Multisets;
import com.sun.jersey.api.view.Viewable;
import org.apache.commons.io.IOUtils;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.NumberFormat;
import java.util.Currency;
import java.util.HashMap;
import java.util.Map;

@Path("/solardata")
public class SolarDataResource {
    private Logger LOG = LoggerFactory.getLogger(SolarDataResource.class);
    private String pathToSolarStats = "caSolarStats.csv";
    private String pathToSolarStatsExtra = "caSolarStatsExtra.csv";

    @GET
    @Produces( MediaType.TEXT_HTML )
    public Viewable showIndex()
    {
        LOG.info("showIndex");
        Map<String, Object> model = new HashMap<String, Object>();
        return new Viewable( "/solardata/index.ftl", model );
    }

    @Produces({"application/json"})
    @Path("/list")
    @GET
    public Response getSolarStats() {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        InputStream resourceAsStream = classLoader.getResourceAsStream(getPathToSolarStats());
        BufferedReader br = new BufferedReader(new InputStreamReader(resourceAsStream));

        JSONObject output = new JSONObject();
        String line;
        try {
            JSONArray installationList = new JSONArray();
            br.readLine();   //skip header...
            while ((line = br.readLine()) != null) {
                String[] stats = line.split(",");
                final String applicationId = stats[0];
                JSONObject solarInstallationJson = buildInstallation(stats);
                installationList.put(solarInstallationJson);
            }
            output.put("solarInstallations", installationList);
        } catch (IOException e) {
            LOG.error("IOException in reading solar installations list", e);
        } catch (JSONException e) {
            LOG.error("JSONException in building solar installations list ", e);
        }

        return Response.ok(output.toString()).build();
    }

    @Produces({"application/json"})
    @Path("/installationCountByZip.json")
    @GET
    public Response getInstallationCountByZip() throws JSONException {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        InputStream resourceAsStream = classLoader.getResourceAsStream(getPathToSolarStats());
        BufferedReader br = new BufferedReader(new InputStreamReader(resourceAsStream));

        JSONObject output = new JSONObject();
        JSONArray installationCountByZip = new JSONArray();
        Multiset<String> allZips = getAllZips(br);

        try {
            for (String zip : Multisets.copyHighestCountFirst(allZips).elementSet()) {
                int count = allZips.count(zip);
                JSONObject zipCodeAndCount = new JSONObject();
                zipCodeAndCount.put("zipCode",zip);
                zipCodeAndCount.put("count",count);
                installationCountByZip.put(zipCodeAndCount);
            }
            output.put("installationCountByZip", installationCountByZip);
        } catch (JSONException e) {
            LOG.error("JSONException in building installations by zipcode list", e);
        }

        return Response.ok(output.toString()).build();
    }

    @Produces({"application/json"})
    @Path("/installationCountByCounty.json")
    @GET
    public Response getInstallationCountByCounty() throws JSONException {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        InputStream resourceAsStream = classLoader.getResourceAsStream(getPathToSolarStatsExtra());
        BufferedReader br = new BufferedReader(new InputStreamReader(resourceAsStream));

        JSONObject output = new JSONObject();
        JSONArray installationCountByCounty = new JSONArray();
        Multiset<String> allCounties = getAllCounties(br);

        try {
            for (String county : Multisets.copyHighestCountFirst(allCounties).elementSet()) {
                int count = allCounties.count(county);
                JSONObject countyAndCount = new JSONObject();
                countyAndCount.put("county",county);
                countyAndCount.put("count",count);
                installationCountByCounty.put(countyAndCount);
            }
            output.put("installationCountByCounty", installationCountByCounty);
        } catch (JSONException e) {
            LOG.error("JSONException in building installations by county list", e);
        }

        return Response.ok(output.toString()).build();
    }

    private Multiset<String> getAllZips(BufferedReader br){
        Multiset<String> allZips = createMultiSetForColIndex(br, 3);
        return allZips;
    }

    private Multiset<String> getAllCounties(BufferedReader br){
        Multiset<String> allCounties = createMultiSetForColIndex(br, 4);
        return allCounties;
    }

    private Multiset<String> createMultiSetForColIndex(BufferedReader br, Integer colIndex){
        Multiset<String> multiset = HashMultiset.create();
        String line;
        String[] stats;
        String col;
        try {
            br.readLine();   //skip header...
            while ((line = br.readLine()) != null) {
                stats = line.split(",");
                if (stats.length > colIndex ) {
                    col = stats[colIndex];
                    multiset.add(col);
                }
            }
        } catch (IOException e) {
            LOG.error("IOException in reading solar installations list", e);
        }

        return multiset;
    }

    private JSONObject buildInstallation(String[] stats) throws JSONException {
        JSONObject solarInstallationJson = new JSONObject();
        SolarInstallation installation = new InstallationBuilder().buildWithStats(stats);

        solarInstallationJson.put("applicationId", installation.getApplicationNumber());
        solarInstallationJson.put("incentiveAmount", formattedAmount(installation.getIncentiveAmount()));
        solarInstallationJson.put("totalCost", formattedAmount(installation.getTotalCost()));
        solarInstallationJson.put("zipCode", installation.getZipCode());
        return solarInstallationJson;
    }

    private String formattedAmount(String amount){
        BigDecimal decimalAmount = new BigDecimal(amount).setScale(2, RoundingMode.HALF_UP);
        NumberFormat formatter =  NumberFormat.getCurrencyInstance();
        formatter.setMaximumFractionDigits(0);
        formatter.setCurrency(Currency.getInstance("USD"));
        formatter.setGroupingUsed(true);
        return formatter.format(decimalAmount);
    }

    public String getPathToSolarStats() {
        return pathToSolarStats;
    }

    public void setPathToSolarStats(String pathToSolarStats) {
        this.pathToSolarStats = pathToSolarStats;
    }

    public String getPathToSolarStatsExtra() {
        return pathToSolarStatsExtra;
    }

    public void setPathToSolarStatsExtra(String pathToSolarStatsExtra) {
        this.pathToSolarStatsExtra = pathToSolarStatsExtra;
    }
}