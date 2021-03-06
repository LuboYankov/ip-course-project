package org.elsysbg.ip.jobs;

import javax.inject.Inject;

import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.jersey.server.ResourceConfig;
import org.jvnet.hk2.guice.bridge.api.GuiceBridge;
import org.jvnet.hk2.guice.bridge.api.GuiceIntoHK2Bridge;
import org.secnod.shiro.jaxrs.ShiroExceptionMapper;
import org.secnod.shiro.jersey.AuthInjectionBinder;
import org.secnod.shiro.jersey.AuthorizationFilterFeature;
import org.secnod.shiro.jersey.SubjectFactory;

public class JobsApplication extends ResourceConfig {

	public JobsApplication() {
	}

	@Inject
	public JobsApplication(ServiceLocator serviceLocator) {
		this();
		register(new AuthorizationFilterFeature());
        register(new SubjectFactory());
        register(new AuthInjectionBinder());
        register(new RollbackExceptionMapper());
        register(new ShiroExceptionMapper());
		GuiceBridge.getGuiceBridge().initializeGuiceBridge(serviceLocator);
		final GuiceIntoHK2Bridge guiceBridge = serviceLocator.getService(GuiceIntoHK2Bridge.class);
		guiceBridge.bridgeGuiceInjector(JobsServletContextListener.injector);
	}
	
}
