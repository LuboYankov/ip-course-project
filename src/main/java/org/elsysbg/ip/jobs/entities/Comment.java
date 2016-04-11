package org.elsysbg.ip.jobs.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Entity
@NamedQueries({
	@NamedQuery(name=Comment.QUERY_BY_AUTHOR, query = "SELECT c from Comment c WHERE c.author=:author"),
	@NamedQuery(name=Comment.QUERY_BY_JOB, query = "SELECT c from Comment c WHERE c.job=:job")
})
public class Comment {
	
	public static final String QUERY_BY_AUTHOR = "commentsByAuthor";
	public static final String QUERY_BY_JOB = "commentsByJob";
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private long id;
	
	@Column(nullable = false)
	private String body;
	
	@Column(nullable = false)
	@ManyToOne
	private Jobs job;
	
	@Column(nullable = false)
	@ManyToOne
	private NormalUser author;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public Jobs getJob() {
		return job;
	}

	public void setJob(Jobs job) {
		this.job = job;
	}

	public NormalUser getAuthor() {
		return author;
	}

	public void setAuthor(NormalUser author) {
		this.author = author;
	}
	
}