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
	private final AuthenticationService authenticationService;
	
	@Inject
	public AdministratorsService(EntityManagerService entityManagerService, AuthenticationService authenticationService) {
		this.entityManagerService = entityManagerService;
		this.authenticationService = authenticationService;
	}

	public Administrator createAdministrator(Administrator administrator) {
		administrator.setPassword(authenticationService.encryptPassword(administrator.getPassword()));
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
	
	public Administrator getAdministratorByUsername(String username) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final TypedQuery<Administrator> query =
					em.createNamedQuery(Administrator.QUERY_BY_USERNAME, Administrator.class);
			query.setParameter("username", username);
			return query.getSingleResult();
		} finally {
			em.close();
		}
	}
	
	public Administrator updateAdministrator(Administrator admin) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			final Administrator result = em.merge(admin);
			em.getTransaction().commit();
			
			return result;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
}
