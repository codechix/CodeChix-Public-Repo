package com.codechix.explorers.resources;

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
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Path("/helloworld")
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

            while ((line = br.readLine()) != null) {
                String[] stats = line.split(",");
                final String applicationId = stats[0];
                final BigDecimal incentiveAmount = new BigDecimal(stats[1]);
                final BigDecimal totalCost = new BigDecimal(stats[2]);
                final Integer zipCode = new Integer(stats[3]);
                JSONObject solarInstallationJson = new JSONObject();
                solarInstallationJson.put("applicationId", applicationId);
                solarInstallationJson.put("incentiveAmount", incentiveAmount);
                solarInstallationJson.put("totalCost", totalCost);
                solarInstallationJson.put("zipCode", zipCode);
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
}
