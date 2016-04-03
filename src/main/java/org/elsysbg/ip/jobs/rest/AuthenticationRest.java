package org.elsysbg.ip.jobs.rest;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.shiro.subject.Subject;
import org.elsysbg.ip.jobs.entities.Employer;
import org.elsysbg.ip.jobs.entities.NormalUser;
import org.elsysbg.ip.jobs.services.AuthenticationService;
import org.secnod.shiro.jaxrs.Auth;

@Path("/authentication")
public class AuthenticationRest {
	private final AuthenticationService authenticationService;

	@Inject
	public AuthenticationRest(AuthenticationService authenticationService) {
		this.authenticationService = authenticationService;
	}
	
	@POST
	@Path("/users")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public NormalUser login(@Auth Subject subject, NormalUser user) {
		authenticationService.login(subject, user.getUsername(), user.getPassword());
		return authenticationService.getCurrentlyLoggedInNormalUser(subject);
	}
	
	@POST
	@Path("/employers")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Employer login(@Auth Subject subject, Employer employer) {
		authenticationService.login(subject, employer.getUsername(), employer.getPassword());
		return authenticationService.getCurrentlyLoggedInEmployer(subject);
	}
	
	@GET
	@Path("/users")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public NormalUser getCurrentlyLoggedInNormalUser(@Auth Subject subject) {
		return authenticationService.getCurrentlyLoggedInNormalUser(subject);
	}
	
	@GET
	@Path("/employers")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Employer getCurrentlyLoggedInEmployer(@Auth Subject subject) {
		return authenticationService.getCurrentlyLoggedInEmployer(subject);
	}
	
	@DELETE
	public void logout(@Auth Subject subject) {
		authenticationService.logout(subject);
	}
}
