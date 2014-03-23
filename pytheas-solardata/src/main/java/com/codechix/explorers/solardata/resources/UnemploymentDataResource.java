package com.codechix.explorers.solardata.resources;

import com.google.common.collect.Multiset;
import com.google.common.collect.Multisets;
import com.sun.jersey.api.view.Viewable;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;


@Path("/unemploymentData")
public class UnemploymentDataResource {

    @GET
    @Produces( MediaType.TEXT_HTML)
    public Viewable csvMap(){
        return new Viewable("/csvmap/index.ftl");
    }
}
