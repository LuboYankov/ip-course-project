package org.elsysbg.ip.jobs.rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.shiro.authz.annotation.RequiresGuest;
import org.elsysbg.ip.jobs.entities.Employer;
import org.elsysbg.ip.jobs.entities.Jobs;
import org.elsysbg.ip.jobs.entities.SecurityRole;
import org.elsysbg.ip.jobs.services.EmployersService;
import org.elsysbg.ip.jobs.services.JobsService;

@Path("/employers")
public class EmployersRest {

	private final EmployersService employersService;
	private final JobsService jobsService;

	@Inject
	public EmployersRest(EmployersService employersService, JobsService jobsService) {
		this.employersService = employersService;
		this.jobsService = jobsService;
	}
	
	@POST
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@RequiresGuest
	public Employer createEmployer(Employer employer) {
		employer.setRole(SecurityRole.EMPLOYER);
		return employersService.createEmployer(employer);
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Employer> getEmployers() {
		return employersService.getEmployers();
	}
	
	@GET
	@Path("/{employerId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Employer getEmployer(@PathParam("employerId") long employerId) {
		return employersService.getEmployer(employerId);
	}
	
	@GET
	@Path("/{employerId}/jobs")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Jobs> getEmployerJobs(@PathParam("employerId") long employerId) {
		final Employer author = employersService.getEmployer(employerId);
		return jobsService.getJobsByAuthor(author);
	}
	
	@DELETE
	@Path("/{employerId}")
	public void deleteEmployer(@PathParam("employerId") long employerId) {
		employersService.deleteEmployer(employerId);
	}
	
}
