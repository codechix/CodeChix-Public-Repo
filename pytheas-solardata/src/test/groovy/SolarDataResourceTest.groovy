package com.codechix.explorers.solardata.resources

import com.google.inject.servlet.GuiceFilter
import com.netflix.karyon.server.guice.KaryonGuiceContextListener
import org.apache.http.HttpResponse
import org.apache.http.client.HttpClient
import org.apache.http.client.methods.HttpGet
import org.apache.http.impl.client.DefaultHttpClient
import org.apache.http.util.EntityUtils
import org.eclipse.jetty.server.Server
import org.eclipse.jetty.servlet.DefaultServlet
import org.eclipse.jetty.servlet.ServletContextHandler
import org.junit.After
import spock.lang.Ignore
import spock.lang.Specification

import javax.ws.rs.core.MediaType

@Ignore
public class SolarDataResourceTest extends Specification {

    SolarDataResource resource
    TestServer testServer
    HttpResponse response

    @After
    public void teardown(){
        EntityUtils.consume(response.getEntity())
        if (testServer != null)
            testServer.stop()
    }

    def testList(){
        given:
            resource = new SolarDataResource()
            HttpClient client = new DefaultHttpClient();
            testServer = new TestServer()
            testServer.start()
            def localPort = testServer.getPort()
            final String endPoint = "http://localhost:" + localPort +"/list";
            HttpGet restGet = new HttpGet(endPoint);
        when:
            response = client.execute(restGet);
        then:
            response.getStatusLine().getStatusCode() == 200
            response.getEntity().getContentType().getValue() ==  MediaType.APPLICATION_JSON
        }


    public class TestServer {
        private Server server
        private int port

        TestServer() {
        }

        public void start(){
            if (server != null) {
                server.stop();
            }
            System.setProperty("archaius.deployment.applicationId","solardata-app")
            System.setProperty("archaius.deployment.environment","dev")
            port = getUsableLocalPort()
            server = new Server(port)

            ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS)
            context.setContextPath("/")
            context.addEventListener(new KaryonGuiceContextListener())

            context.addFilter(GuiceFilter.class, "/*", 1)
            context.addServlet(DefaultServlet.class, "/")

            server.setHandler(context)

            server.start()
        }

        public void stop(){
            if (server != null) {
                server.stop();
            }
        }

        int getPort() {
            return port
        }

        private static int getUsableLocalPort() throws IOException {
            ServerSocket ss = new ServerSocket(0)
            ss.setReuseAddress(true)
            return ss.getLocalPort()
        }

    }


}