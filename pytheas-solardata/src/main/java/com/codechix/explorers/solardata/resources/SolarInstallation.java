package com.codechix.explorers.solardata.resources;

public class SolarInstallation {

    private String applicationNumber;
    private String incentiveAmount;
    private String totalCost;
    private String zipCode;

    public SolarInstallation() {
    }

    public String getApplicationNumber() {
        return applicationNumber;
    }

    void setApplicationNumber(String applicationNumber) {
        this.applicationNumber = applicationNumber;
    }

    String getIncentiveAmount() {
        return incentiveAmount;
    }

    void setIncentiveAmount(String incentiveAmount) {
        this.incentiveAmount = incentiveAmount;
    }

    String getZipCode() {
        return zipCode;
    }

    void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(String totalCost) {
        this.totalCost = totalCost;
    }

    @Override
    public String toString() {
        return "SolarInstallation{" +
                "applicationNumber='" + applicationNumber + '\'' +
                ", incentiveAmount=" + incentiveAmount +
                ", totalCost=" + totalCost +
                ", zipCode=" + zipCode +
                '}';
    }
}
