package com.codechix.explorers.solardata.resources;

import org.apache.commons.io.IOUtils;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;

@Path("/geopolitical")
public class GeoPoliticalResource {

    @Produces({"application/json"})
    @Path("/ca_counties_name.json")
    @GET
    public Response getCounties() throws IOException, JSONException {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        InputStream stream = classLoader.getResourceAsStream("ca_counties_name.json");

        StringWriter writer = new StringWriter();
        IOUtils.copy(stream, writer, "UTF-8");
        String theString = writer.toString();

        JSONObject json = new JSONObject(theString);

        return Response.ok(json.toString()).build();
    }

    @Produces({"application/json"})
    @Path("/ca_zipcodes.json")
    @GET
    public Response getCaZipcodes() throws IOException, JSONException {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        InputStream stream = classLoader.getResourceAsStream("ca_zipcodes_2.json");

        StringWriter writer = new StringWriter();
        IOUtils.copy(stream, writer, "UTF-8");
        String theString = writer.toString();

        JSONObject json = new JSONObject(theString);

        return Response.ok(json.toString()).build();
    }

}
