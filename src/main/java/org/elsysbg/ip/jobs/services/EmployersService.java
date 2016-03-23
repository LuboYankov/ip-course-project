package org.elsysbg.ip.jobs.services;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;

import org.elsysbg.ip.jobs.entities.Employer;

@Singleton
public class EmployersService {

private final EntityManagerService entityManagerService;
	
	@Inject
	public EmployersService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}

	public Employer createEmployer(Employer employer) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(employer);
			em.getTransaction().commit();
			return employer;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
}
