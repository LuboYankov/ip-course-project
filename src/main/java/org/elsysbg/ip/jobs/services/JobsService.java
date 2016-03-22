package org.elsysbg.ip.jobs.services;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;

import org.elsysbg.ip.jobs.entities.Jobs;
import org.elsysbg.ip.jobs.services.EntityManagerService;

@Singleton
public class JobsService {

	private final EntityManagerService entityManagerService;
	
	@Inject
	public JobsService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}

	public Jobs createJobs(Jobs job) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(job);
			em.getTransaction().commit();
			return job;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
}
