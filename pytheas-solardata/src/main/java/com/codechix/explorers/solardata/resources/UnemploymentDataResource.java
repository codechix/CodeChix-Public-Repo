package com.codechix.explorers.solardata.resources;

import com.sun.jersey.api.view.Viewable;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


@Path("/unemploymentData")
public class UnemploymentDataResource {

    @GET
    @Produces( MediaType.TEXT_HTML)
    public Viewable csvMap(){
        return new Viewable("/csvMap/index.ftl");
    }
}
