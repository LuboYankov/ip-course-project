package org.elsysbg.ip.jobs.rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.elsysbg.ip.jobs.entities.Administrator;
import org.elsysbg.ip.jobs.entities.SecurityRole;
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
	@RequiresPermissions("admin:registration")
	public Administrator createAdministrator(Administrator administrator) {
		administrator.setRole(SecurityRole.ADMINISTRATOR);
		return administratorsService.createAdministrator(administrator);
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Administrator> getAdministrators() {
		return administratorsService.getAdministrators();
	}
	
	@GET
	@Path("/{administratorId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Administrator getAdministrator(@PathParam("administratorId") long administratorId) {
		return administratorsService.getAdministrator(administratorId);
	}

}
