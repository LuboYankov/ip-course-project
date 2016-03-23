package org.elsysbg.ip.jobs.rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.elsysbg.ip.jobs.entities.Employer;
import org.elsysbg.ip.jobs.services.EmployersService;

@Path("/employers")
public class EmployersRest {

	private final EmployersService employersService;

	@Inject
	public EmployersRest(EmployersService employersService) {
		this.employersService = employersService;
	}
	
	@POST
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Employer createEmployer(Employer employer) {
		return employersService.createEmployer(employer);
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Employer> getEmployers() {
		return employersService.getEmployers();
	}
	
}
