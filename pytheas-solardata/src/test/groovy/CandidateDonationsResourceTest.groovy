import com.codechix.explorers.solardata.resources.CandidateDonationsResource
import spock.lang.Specification

class CandidateDonationsResourceTest extends Specification {

    def getDonationAmountCountyMap(){
        given:
            CandidateDonationsResource resource = new CandidateDonationsResource()
            ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
            InputStream resourceAsStream = classLoader.getResourceAsStream("test_candidate_donations_2013");

         when:
            Map<String,BigDecimal> result = resource.getDonationAmountCountyMap(resourceAsStream)
        then:
            result.get("Santa Barbara") == new BigDecimal("2350")
    }
}
