package org.elsysbg.ip.jobs;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.openjpa.jdbc.schema.SimpleDriverDataSource;
import org.elsysbg.ip.jobs.services.EntityManagerService;

public class JobsDataSource extends SimpleDriverDataSource {
	@Override
	protected Connection getSimpleConnection(Properties props)
			throws SQLException {
		final EntityManagerService entityManagerService = JobsServletContextListener.injector.getInstance(EntityManagerService.class);
		return entityManagerService.createEntityManager().unwrap(Connection.class);
	}
}
