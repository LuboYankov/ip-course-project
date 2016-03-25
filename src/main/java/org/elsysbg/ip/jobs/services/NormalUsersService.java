package org.elsysbg.ip.jobs.services;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

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
	
	public List<NormalUser> getNormalUsers() {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final TypedQuery<NormalUser> query =
				em.createNamedQuery(NormalUser.QUERY_ALL, NormalUser.class);
			return query.getResultList();
		} finally {
			em.close();
		}
	}
	
	public NormalUser getNormalUser(long normalUserId) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final NormalUser result = em.find(NormalUser.class, normalUserId);
			if (result == null) {
				throw new IllegalArgumentException("No user found with id: " + normalUserId);
			}
			return result;
		} finally {
			em.close();
		}
	}
	
}
