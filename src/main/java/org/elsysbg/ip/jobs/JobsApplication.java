package org.elsysbg.ip.jobs;

import javax.inject.Inject;

import org.elsysbg.ip.jobs.JobsServletContextListener;
import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.jersey.server.ResourceConfig;
import org.jvnet.hk2.guice.bridge.api.GuiceBridge;
import org.jvnet.hk2.guice.bridge.api.GuiceIntoHK2Bridge;

public class JobsApplication extends ResourceConfig {

	public JobsApplication() {
	}

	@Inject
	public JobsApplication(ServiceLocator serviceLocator) {
		this();

		GuiceBridge.getGuiceBridge().initializeGuiceBridge(serviceLocator);
		final GuiceIntoHK2Bridge guiceBridge = serviceLocator.getService(GuiceIntoHK2Bridge.class);
		guiceBridge.bridgeGuiceInjector(JobsServletContextListener.injector);
	}
	
}
