package org.elsysbg.ip.jobs.rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.shiro.authz.annotation.RequiresGuest;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.elsysbg.ip.jobs.entities.Jobs;
import org.elsysbg.ip.jobs.entities.NormalUser;
import org.elsysbg.ip.jobs.entities.SecurityRole;
import org.elsysbg.ip.jobs.services.NormalUsersService;

@Path("/users")
public class NormalUsersRest {

	private final NormalUsersService normalUsersService;

	@Inject
	public NormalUsersRest(NormalUsersService normalUsersService) {
		this.normalUsersService = normalUsersService;
	}
	
	@POST
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@RequiresGuest
	public NormalUser createNormalUser(NormalUser normalUser) {
		normalUser.setRole(SecurityRole.NORMALUSER);
		return normalUsersService.createNormalUser(normalUser);
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<NormalUser> getNormalUsers() {
		return normalUsersService.getNormalUsers();
	}
	
	@GET
	@Path("/{normalUserId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public NormalUser getNormalUser(@PathParam("normalUserId") long normalUserId) {
		return normalUsersService.getNormalUser(normalUserId);
	}
	
	@PUT
	@Path("/{normalUserId}/favourite/{jobId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@RequiresPermissions("favourites:create")
	public NormalUser addFavourite(@PathParam("normalUserId") long normalUserId, @PathParam("jobId") long jobId) {
		return normalUsersService.addFavourite(normalUserId, jobId);
	}
	
	@GET
	@Path("/{normalUserId}/favourites")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Jobs> getFavourites(@PathParam("normalUserId") long normalUserId) {
		final NormalUser user = normalUsersService.getNormalUser(normalUserId);
		return user.getFavourites();
	}
	
}
