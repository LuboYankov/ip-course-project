package org.elsysbg.ip.jobs.services;

import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

@Singleton
public class EntityManagerService {
	private final EntityManagerFactory emf;
	
	public EntityManagerService() {
		emf = Persistence.createEntityManagerFactory("jobs-jpa");
	}
	
	public EntityManager createEntityManager() {
		return emf.createEntityManager();
	}
}