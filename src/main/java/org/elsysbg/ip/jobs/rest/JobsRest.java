package org.elsysbg.ip.jobs.rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.elsysbg.ip.jobs.entities.Employer;
import org.elsysbg.ip.jobs.entities.Jobs;
import org.elsysbg.ip.jobs.services.EmployersService;
import org.elsysbg.ip.jobs.services.JobsService;

@Path("/jobs")
public class JobsRest {

	private final JobsService jobsService;
	private final EmployersService employersService;

	@Inject
	public JobsRest(JobsService jobsService, EmployersService employersService) {
		this.jobsService = jobsService;
		this.employersService = employersService;
	}
	
	@POST
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Jobs createJobs(Jobs job) {
		final List<Employer> employers = employersService.getEmployers();
		job.setAuthor(employers.iterator().next());
		return jobsService.createJobs(job);
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Jobs> getJobs() {
		return jobsService.getJobs();
	}
	
	@GET
	@Path("/{jobId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Jobs getJob(@PathParam("jobId") long jobId) {
		return jobsService.getJob(jobId);
	}
	
	@DELETE
	@Path("/{jobId}")
	public void deleteJob(@PathParam("jobId") long jobId) {
		jobsService.deleteJob(jobId);
	}
	
	@PUT
	@Path("/{jobId}")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Jobs updateTask(@PathParam("jobId") long jobId, Jobs job) {
		final Jobs fromDb = jobsService.getJob(jobId);
		fromDb.setTitle(job.getTitle());
		fromDb.setDescription(job.getDescription());
		return jobsService.updateJob(fromDb);
	}
}
