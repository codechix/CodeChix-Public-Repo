package codechix.explorers.resources;

import java.awt.*;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

public class SolarDataAppResource {
    private Logger LOG = LoggerFactory.getLogger(HelloWorldAppResource.class);

    @GET
    @Produces( PageAttributes.MediaType.TEXT_HTML )
    public Viewable showIndex()
    {
        LOG.info("home page");
        Map<String, Object> model = new HashMap<String, Object>();
        return new Viewable( "/helloworld/home.ftl", model );
    }
}
