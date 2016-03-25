package org.elsysbg.ip.jobs.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.elsysbg.ip.jobs.entities.Administrator;
import org.elsysbg.ip.jobs.services.AdministratorsService;

@Path("/administrators")
public class AdministratorsRest {

	private final AdministratorsService administratorsService;

	@Inject
	public AdministratorsRest(AdministratorsService administratorsService) {
		this.administratorsService = administratorsService;
	}
	
	@POST
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Administrator createAdministrator(Administrator administrator) {
		return administratorsService.createAdministrator(administrator);
	}

}
