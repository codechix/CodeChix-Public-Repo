package com.codechix.explorers.solardata.installation;

public class InstallationBuilder {

    private SolarInstallation installation;

    public InstallationBuilder() {
        installation = new SolarInstallation();
    }

    public SolarInstallation build() {
        return installation;
    }

    public InstallationBuilder withApplicationNumber(String applicationNumber) {
        installation.setApplicationNumber(applicationNumber);
        return this;
    }

    public InstallationBuilder withId(String applicationNumber) {
        installation.setApplicationNumber(applicationNumber);
        return this;
    }

    public InstallationBuilder withIncentive(String incentive) {
        installation.setIncentiveAmount(incentive);
        return this;
    }


    public InstallationBuilder withTotalCost(String totalCost) {
        installation.setTotalCost(totalCost);
        return this;
    }

    public InstallationBuilder withZipCode(String zipCode) {
        installation.setZipCode(zipCode);
        return this;
    }

    public SolarInstallation buildWithStats(String[] stats) {

        for (int i = 0; i < stats.length; i++) {
            switch (i) {
                case 0:
                    installation.setApplicationNumber(stats[i]);
                    break;
                case 1:
                    installation.setIncentiveAmount(stats[i]);
                    break;
                case 2:
                    installation.setTotalCost(stats[i]);
                    break;
                case 3:
                    installation.setZipCode(stats[i]);
                    break;
            }

        }

        return installation;
    }
}
