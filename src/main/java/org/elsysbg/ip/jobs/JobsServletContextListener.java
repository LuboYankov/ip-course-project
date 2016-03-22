package org.elsysbg.ip.jobs;

import org.elsysbg.ip.jobs.services.EntityManagerService;
import org.elsysbg.ip.jobs.services.JobsService;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.ServletModule;

public class JobsServletContextListener extends GuiceServletContextListener {

	public static Injector injector;

	@Override
	protected Injector getInjector() {
		if (injector == null) {
			injector = Guice.createInjector(new ServletModule() {
				@Override
				protected void configureServlets() {
					bind(EntityManagerService.class);
					bind(JobsService.class);
				}
			});
		}
		return injector;
	}
	
}
