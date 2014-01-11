package com.codechix.explorers.solardata.resources;

import com.google.common.collect.HashMultiset;
import com.google.common.collect.Multiset;
import com.google.common.collect.Multisets;
import com.sun.jersey.api.view.Viewable;
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
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/solardata")
public class SolarDataResource {
    private Logger LOG = LoggerFactory.getLogger(SolarDataResource.class);

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
        InputStream resourceAsStream = classLoader.getResourceAsStream("caSolarStats.csv");
        BufferedReader br = new BufferedReader(new InputStreamReader(resourceAsStream));

        JSONObject output = new JSONObject();
        String line = null;
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
        InputStream resourceAsStream = classLoader.getResourceAsStream("caSolarStats.csv");
        BufferedReader br = new BufferedReader(new InputStreamReader(resourceAsStream));
        JSONObject output = new JSONObject();
        String line = null;
        try {
            Multiset<String> allZips = HashMultiset.create();

            br.readLine();   //skip header...
            String[] stats;
            String zipCode;
            while ((line = br.readLine()) != null) {
                stats = line.split(",");
                if (stats.length > 3 ) {
                    zipCode = stats[3];
                    allZips.add(zipCode);
                }
            }
            Map<String,Integer> zipCodeCounts = new HashMap<String,Integer>();
            for (String zip : Multisets.copyHighestCountFirst(allZips).elementSet()) {
                zipCodeCounts.put(zip,allZips.count(zip));
            }
            output.put("installationCountByZip", zipCodeCounts);
        } catch (IOException e) {
            LOG.error("IOException in reading solar installations list", e);
        } catch (JSONException e) {
            LOG.error("JSONException in building solar installations list ", e);
        }

        return Response.ok(output.toString()).build();
    }

    private JSONObject buildInstallation(String[] stats) throws JSONException {
        JSONObject solarInstallationJson = new JSONObject();
        SolarInstallation installation = new InstallationBuilder().buildWithStats(stats);

        solarInstallationJson.put("applicationId", installation.getApplicationNumber());
        solarInstallationJson.put("incentiveAmount", installation.getIncentiveAmount());
        solarInstallationJson.put("totalCost", installation.getTotalCost());
        solarInstallationJson.put("zipCode", installation.getZipCode());
        return solarInstallationJson;
    }
}