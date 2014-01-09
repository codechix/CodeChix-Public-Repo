package com.codechix.explorers.solardata.resources;

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
import java.util.*;

@Path("/fakedata")
public class FakeDataResource {
    private Logger LOG = LoggerFactory.getLogger(FakeDataResource.class);

    @GET
    @Produces( MediaType.TEXT_HTML )
    public Viewable showIndex() throws JSONException {
        LOG.info("showIndex");
        List<Integer> values = Arrays.asList(5000, 4000, 3000, 2000, 1000 );
        JSONArray installationList = new JSONArray(values);
        Map<String,Object> model = new HashMap<String,Object>();
        model.put("values",installationList);
        return new Viewable( "/fakedata/index.ftl", model );
    }
}
