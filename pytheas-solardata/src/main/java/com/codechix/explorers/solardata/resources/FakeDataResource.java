package com.codechix.explorers.solardata.resources;

import com.sun.jersey.api.view.Viewable;
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
    public Viewable showIndex()
    {
        LOG.info("showIndex");
        Map<String, Object> model = new HashMap<String, Object>();
        List<String> values = Arrays.asList("1000","1001","1002");
        model.put("values",values);
        return new Viewable( "/fakedata/index.ftl", model );
    }
}
