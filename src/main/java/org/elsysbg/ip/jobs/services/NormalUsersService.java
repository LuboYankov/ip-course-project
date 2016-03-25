package org.elsysbg.ip.jobs.services;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;

import org.elsysbg.ip.jobs.entities.NormalUser;

@Singleton
public class NormalUsersService {
	
	private final EntityManagerService entityManagerService;

	@Inject
	public NormalUsersService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}

	public NormalUser createNormalUser(NormalUser normalUser) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			em.persist(normalUser);
			em.getTransaction().commit();
			return normalUser;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
}
