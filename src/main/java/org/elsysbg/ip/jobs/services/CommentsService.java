package org.elsysbg.ip.jobs.services;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.elsysbg.ip.jobs.entities.Comment;
import org.elsysbg.ip.jobs.entities.Jobs;
import org.elsysbg.ip.jobs.entities.NormalUser;

@Singleton
public class CommentsService {

	private final EntityManagerService entityManagerService;
	
	@Inject
	public CommentsService(EntityManagerService entityManagerService) {
		this.entityManagerService = entityManagerService;
	}

	public Comment createComment(long jobId, Comment comment) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final Jobs job = em.find(Jobs.class, jobId);
			comment.setJob(job);
			em.getTransaction().begin();
			em.persist(comment);
			em.getTransaction().commit();
			return comment;
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
	public List<Comment> getCommentsByAuthor(NormalUser author) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final TypedQuery<Comment> query = em.createNamedQuery(Comment.QUERY_BY_AUTHOR, Comment.class);
			query.setParameter("author", author);
			return query.getResultList();
		} finally {
			em.close();
		}
	}
	
	public List<Comment> getCommentsByJob(long jobId) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			final TypedQuery<Comment> query = em.createNamedQuery(Comment.QUERY_BY_JOB, Comment.class);
			final Jobs job = em.find(Jobs.class, jobId);
			query.setParameter("job", job);
			return query.getResultList();
		} finally {
			em.close();
		}
	}
	
	public void deleteComment(long commentId) {
		final EntityManager em = entityManagerService.createEntityManager();
		try {
			em.getTransaction().begin();
			final Comment comment = em.find(Comment.class, commentId);
			if (comment == null) {
				throw new IllegalArgumentException("No job found with id: " + commentId);
			}
			em.remove(comment);
			
			em.getTransaction().commit();
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
			em.close();
		}
	}
	
}
