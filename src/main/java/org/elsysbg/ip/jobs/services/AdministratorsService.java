package org.elsysbg.ip.jobs.services;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;

import org.elsysbg.ip.jobs.entities.Administrator;

@Singleton
public class AdministratorsService {

	private final EntityManagerService entityManagerService;
	
	@Inject
	public AdministratorsService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}

	public Administrator createAdministrator(Administrator administrator) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(administrator);
			em.getTransaction().commit();
			return administrator;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
}
