package com.codechix.explorers.solardata.resources;

import com.sun.jersey.api.view.Viewable;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/solarmap")
public class SolarMapResource {

    @GET
    @Produces( MediaType.TEXT_HTML)
    public Viewable solarMap(){
        return new Viewable("/solarmap/index.ftl");

    }
}
