package org.elsysbg.ip.jobs.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.elsysbg.ip.jobs.entities.Jobs;
import org.elsysbg.ip.jobs.services.JobsService;

@Path("/jobs")
public class JobsRest {

	private final JobsService jobsService;

	@Inject
	public JobsRest(JobsService jobsService) {
		this.jobsService = jobsService;
	}
	
	@POST
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Jobs createJobs(Jobs job) {
		return jobsService.createJobs(job);
	}
	
}