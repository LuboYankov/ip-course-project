package org.elsysbg.ip.jobs.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Entity
@NamedQueries({
	@NamedQuery(name=NormalUser.QUERY_ALL, query = "SELECT u from NormalUser u"),
	@NamedQuery(name=NormalUser.QUERY_BY_USERNAME, query = "SELECT u from NormalUser u WHERE u.username=:username")
})
public class NormalUser {
	
	public static final String QUERY_ALL = "normalusersAll";
	public static final String QUERY_BY_USERNAME = "normalUsersByUsername";
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "USER_ID", nullable = false)
	private long id;
	
	@Column(nullable = false, unique=true)
	private String username;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String password;
	
	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String phone;
	
	@JoinTable(
		joinColumns = {	@JoinColumn(name = "user_id", referencedColumnName = "USER_ID", nullable = false) }, 
		inverseJoinColumns = {	@JoinColumn(name = "job_id", referencedColumnName = "JOB_ID", nullable = false) }
	)
	@ManyToMany(targetEntity=Jobs.class, fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Jobs> favourites;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private SecurityRole role;
	
	public NormalUser() {
		this.favourites = new ArrayList<Jobs>();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public SecurityRole getRole() {
		return role;
	}

	public void setRole(SecurityRole role) {
		this.role = role;
	}

	public List<Jobs> getFavourites() {
		return favourites;
	}

	public void setFavourites(List<Jobs> favourites) {
		this.favourites = favourites;
	}
	
	public void addFavourite(Jobs job) {
		this.favourites.add(job);
	}
}
