import com.codechix.explorers.solardata.resources.SolarDataResource
import com.codechix.explorers.solardata.resources.UnemploymentDataResource
import spock.lang.Specification

import javax.ws.rs.core.Response

class UnemploymentDataResourceTest extends Specification {

    UnemploymentDataResource resource

    def getUnemploymentData(){
        given:
        ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
        InputStream resourceAsStream = classLoader.getResourceAsStream("county_unemployment_rates.csv");
        BufferedReader br = new BufferedReader(new InputStreamReader(resourceAsStream));
        String line;
        StringBuffer theData = new StringBuffer()
        try {
            while((line = br.readLine()) != null){
                theData.append(line)
                theData.append("\n")
            }

        }
        catch (IOException e) {
            false
        }
        resource = new UnemploymentDataResource()
        when:
        Response response = resource.getUnemploymentData()
        then:
        response
        response.getStatus() == 200
        response.getEntity().toString() == theData.toString()
    }
}
