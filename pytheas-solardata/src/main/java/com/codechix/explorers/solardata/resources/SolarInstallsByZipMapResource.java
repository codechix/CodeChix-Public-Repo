package com.codechix.explorers.solardata.resources;

import com.sun.jersey.api.view.Viewable;
import org.apache.commons.io.IOUtils;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.*;
import java.util.Map;

@Path("/solarInstallsByZipMap")
public class SolarInstallsByZipMapResource {

    @GET
    @Produces( MediaType.TEXT_HTML)
    public Viewable solarMap(){
        return new Viewable("/solarInstallsByZipMap/index.ftl");
    }

}
