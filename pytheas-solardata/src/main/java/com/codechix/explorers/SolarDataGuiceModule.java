package com.codechix.explorers;

import com.google.inject.AbstractModule;
import com.netflix.explorers.Explorer;
import com.netflix.explorers.annotations.ExplorerGuiceModule;
import com.google.inject.multibindings.Multibinder;

@ExplorerGuiceModule(jerseyPackagePath = "com.netflix.explorers.helloworld.resources")
public class SolarDataGuiceModule extends AbstractModule {
    @Override
    protected void configure() {
        Multibinder<Explorer> explorersBinder = Multibinder.newSetBinder(binder(), Explorer.class);
        explorersBinder.addBinding().to(SolarDataExplorer.class);
    }
}
