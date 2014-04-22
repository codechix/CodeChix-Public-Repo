package com.codechix.explorers.solardata.resources;

import com.codechix.explorers.solardata.geopolitical.CaliforniaCounties;
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
import java.awt.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.Map;

@Path("/candidateDonations")
public class CandidateDonationsResource {
    private Logger LOG = LoggerFactory.getLogger(CandidateDonationsResource.class);
    @GET
    @Produces(MediaType.TEXT_HTML)
    public Viewable getCandidateDonations(){
        return new Viewable("/candidatedonations/index.ftl");
    }

    @Produces({"application/json"})
    @Path("/donationTotalByCounty.json")
    @GET
    public Response getDonationTotalByCounty() throws JSONException {
         JSONObject output = new JSONObject();
        JSONArray donationTotalByCounty = new JSONArray();
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        InputStream resourceAsStream = classLoader.getResourceAsStream("candidate_donations_2013.csv");
        Map<String,BigDecimal> donationsByCounty = getDonationAmountCountyMap(resourceAsStream);

        try {
            for (String entry:donationsByCounty.keySet()) {
                JSONObject countyAmount = new JSONObject();
                countyAmount.put("county",entry);
                countyAmount.put("amount",donationsByCounty.get(entry).setScale(0, RoundingMode.FLOOR));
                donationTotalByCounty.put(countyAmount);
            }
            output.put("donationTotalByCounty", donationTotalByCounty);
        } catch (JSONException e) {
            LOG.error("JSONException in building donations by county map", e);
        }

        return Response.ok(output.toString()).build();
    }

    protected Map<String,BigDecimal> getDonationAmountCountyMap(InputStream resourceAsStream){

        BufferedReader br = new BufferedReader(new InputStreamReader(resourceAsStream));
        String line;
        String[] elements;
        Map<String,BigDecimal> map = new HashMap<String,BigDecimal>();

        try {
            br.readLine();   //skip header...
            while ((line = br.readLine()) != null) {
                elements = line.split(",");
                if (map.get(elements[1]) == null) {
                    map.put(elements[1],new BigDecimal(elements[2]));
                } else {
                    map.put(elements[1], map.get(elements[1]).add(new BigDecimal(elements[2])));
                }

            }
        } catch (IOException e) {
            LOG.error("IOException in reading candidate donations", e);
        }
        return map;
    }
}
