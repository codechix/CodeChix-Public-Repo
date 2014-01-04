package com.codechix.explorers.resources;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import com.sun.jersey.api.view.Viewable;

public class SolarDataAppResource {
    private Logger LOG = LoggerFactory.getLogger(SolarDataAppResource.class);

    @GET
    @Produces( MediaType.TEXT_HTML )
    public Viewable showIndex()
    {
        LOG.info("home page");
        Map<String, Object> model = new HashMap<String, Object>();
        return new Viewable( "/helloworld/home.ftl", model );
    }
}
