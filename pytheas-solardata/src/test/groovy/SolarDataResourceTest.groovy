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

public class SolarDataResourceTest extends Specification {

    SolarDataResource resource
    TestServer testServer
    HttpResponse response

    def getSolarStatsTest(){
        given:
            def path="testCaSolarData.csv"
            resource = new SolarDataResource()
            resource.setPathToSolarStats(path)
        when:
            def response = resource.getSolarStats()
        then:
            response
            response.getStatus()  == 200
            response.getEntity() == "{\"solarInstallations\":[{\"applicationId\":\"\\\"SD-CSI-07388\\\"\",\"incentiveAmount\":\"35000\",\"totalCost\":\"71000\",\"zipCode\":\"91901\"},{\"applicationId\":\"\\\"SD-CSI-01581\\\"\",\"incentiveAmount\":\"7000\",\"totalCost\":\"55000\",\"zipCode\":\"93013\"},{\"applicationId\":\"\\\"SD-CSI-02825\\\"\",\"incentiveAmount\":\"9000\",\"totalCost\":\"59000.4\",\"zipCode\":\"94103\"},{\"applicationId\":\"\\\"SD-CSI-01581\\\"\",\"incentiveAmount\":\"6000\",\"totalCost\":\"50000\",\"zipCode\":\"93013\"},{\"applicationId\":\"\\\"SD-CSI-01581\\\"\",\"incentiveAmount\":\"5000\",\"totalCost\":\"45000\",\"zipCode\":\"93013\"}]}"
    }

    def getInstallationCountByZipTest(){
        given:
        def path="testCaSolarData.csv"
            resource = new SolarDataResource()
            resource.setPathToSolarStats(path)
        when:
            def response = resource.getInstallationCountByZip()
        then:
            response
            response.getStatus()  == 200
            response.getEntity() == "{\"installationCountByZip\":[{\"zipCode\":\"93013\",\"count\":3},{\"zipCode\":\"94103\",\"count\":1},{\"zipCode\":\"91901\",\"count\":1}]}"
    }

    def getInstallationCountByCountyTest(){
        given:
        def path="testCaSolarDataExtra.csv"
        resource = new SolarDataResource()
        resource.setPathToSolarStatsExtra(path)
        when:
        def response = resource.getInstallationCountByCounty()
        then:
        response
        response.getStatus()  == 200
        response.getEntity() == "{\"installationCountByCounty\":[{\"county\":\"San Diego\",\"count\":3},{\"county\":\"Santa Barbara\",\"count\":1}]}"
    }

    @Ignore //I think I've got the wrong endPoint path here... tbd
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
            teardown()
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
    public void teardown(){
        EntityUtils.consume(response.getEntity())
        if (testServer != null)
            testServer.stop()
    }



}