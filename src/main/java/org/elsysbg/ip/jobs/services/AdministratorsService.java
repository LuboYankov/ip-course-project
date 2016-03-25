package org.elsysbg.ip.jobs.services;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

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
	
	public List<Administrator> getAdministrators() {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final TypedQuery<Administrator> query =
				em.createNamedQuery(Administrator.QUERY_ALL, Administrator.class);
			return query.getResultList();
		} finally {
			em.close();
		}
	}
	
	public Administrator getAdministrator(long administratorId) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final Administrator result = em.find(Administrator.class, administratorId);
			if (result == null) {
				throw new IllegalArgumentException("No administrator found with id: " + administratorId);
			}
			return result;
		} finally {
			em.close();
		}
	}
	
}
