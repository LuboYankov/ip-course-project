package org.elsysbg.ip.jobs.services;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

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
	
	public List<Jobs> getJobs() {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final TypedQuery<Jobs> query =
				em.createNamedQuery(Jobs.QUERY_ALL, Jobs.class);
			return query.getResultList();
		} finally {
			em.close();
		}
	}
	
	public Jobs getJob(long jobId) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final Jobs result = em.find(Jobs.class, jobId);
			if (result == null) {
				throw new IllegalArgumentException("No jobs found with id: " + jobId);
			}
			return result;
		} finally {
			em.close();
		}
	}
	
	public void deleteJob(long jobId) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			final Jobs job = em.find(Jobs.class, jobId);
			if (job == null) {
				throw new IllegalArgumentException("No job found with id: " + jobId);
			}
			em.remove(job);
			
			em.getTransaction().commit();
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
}
