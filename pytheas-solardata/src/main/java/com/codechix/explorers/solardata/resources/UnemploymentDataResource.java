package com.codechix.explorers.solardata.resources;

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


@Path("/unemploymentData")
public class UnemploymentDataResource {
    private Logger LOG = LoggerFactory.getLogger(UnemploymentDataResource.class);
    private String pathToUnemploymentRates = "county_unemployment_rates.csv";


    @GET
    @Produces( MediaType.TEXT_HTML)
    public Viewable csvMap(){
        return new Viewable("/csvmap/index.ftl");
    }

    @GET
    @Produces( MediaType.TEXT_PLAIN )
    @Path("/county_unemployment_rates.csv")
    public Response getUnemploymentData()
    {  StringBuffer output = new StringBuffer();
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        InputStream resourceAsStream = classLoader.getResourceAsStream(pathToUnemploymentRates);
        BufferedReader br = new BufferedReader(new InputStreamReader(resourceAsStream));
        String line;
        try {
            while ((line = br.readLine()) != null) {
                output.append(line);
                output.append("\n");
            }
        } catch (IOException e) {
            LOG.error("IOException in reading unemployment rates", e);
        }

        return Response.ok(output.toString()).build();
    }
}
