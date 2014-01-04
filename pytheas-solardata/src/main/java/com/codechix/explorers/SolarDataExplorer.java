package com.codechix.explorers;

import com.netflix.explorers.AbstractExplorerModule;
import com.google.inject.Singleton;

@Singleton
public class SolarDataExplorer extends AbstractExplorerModule {

    public SolarDataExplorer() {
        super("solardata");
    }
}
