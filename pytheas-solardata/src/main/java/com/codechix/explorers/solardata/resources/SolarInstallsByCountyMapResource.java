package com.codechix.explorers.solardata.resources;

import com.sun.jersey.api.view.Viewable;
import org.apache.commons.io.IOUtils;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;

@Path("/solarInstallsByCountyMap")
public class SolarInstallsByCountyMapResource {
    @GET
    @Produces( MediaType.TEXT_HTML)
    public Viewable solarMap(){
        return new Viewable("/solarInstallsByCountyMap/index.ftl");
    }
    @Produces({"application/json"})
    @Path("/ca_counties.json")
    @GET
    public Response getCounties() throws IOException, JSONException {
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        InputStream stream = classLoader.getResourceAsStream("ca_counties_2.json");

        StringWriter writer = new StringWriter();
        IOUtils.copy(stream, writer, "UTF-8");
        String theString = writer.toString();

        JSONObject json = new JSONObject(theString);

        return Response.ok(json.toString()).build();
    }
}
