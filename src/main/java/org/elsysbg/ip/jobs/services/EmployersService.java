package org.elsysbg.ip.jobs.services;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.elsysbg.ip.jobs.entities.Employer;

@Singleton
public class EmployersService {

	private final EntityManagerService entityManagerService;
	private final AuthenticationService authenticationService;
	
	@Inject
	public EmployersService(EntityManagerService entityManagerService, AuthenticationService authenticationService) {
		this.entityManagerService = entityManagerService;
		this.authenticationService = authenticationService;
	}

	public Employer createEmployer(Employer employer) {
		employer.setPassword(authenticationService.encryptPassword(employer.getPassword()));
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
	
	public List<Employer> getEmployers() {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final TypedQuery<Employer> query =
				em.createNamedQuery(Employer.QUERY_ALL, Employer.class);
			return query.getResultList();
		} finally {
			em.close();
		}
	}
	
	public Employer getEmployer(long employerId) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final Employer result = em.find(Employer.class, employerId);
			if (result == null) {
				throw new IllegalArgumentException("No employer found with id: " + employerId);
			}
			return result;
		} finally {
			em.close();
		}
	}
	
	public void deleteEmployer(long employerId) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			final Employer employer = em.find(Employer.class, employerId);
			if (employer == null) {
				throw new IllegalArgumentException("No employer found with id: " + employerId);
			}
			em.remove(employer);
			
			em.getTransaction().commit();
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public Employer getEmployerByUsername(String username) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final TypedQuery<Employer> query =
					em.createNamedQuery(Employer.QUERY_BY_USERNAME, Employer.class);
			query.setParameter("username", username);
			return query.getSingleResult();
		} finally {
			em.close();
		}
	}
	
}
