package org.elsysbg.ip.jobs.services;

import java.util.Collection;

import javax.inject.Inject;
import javax.inject.Provider;
import javax.inject.Singleton;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.PasswordMatcher;
import org.apache.shiro.authc.credential.PasswordService;
import org.apache.shiro.mgt.RealmSecurityManager;
import org.apache.shiro.realm.AuthenticatingRealm;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.subject.Subject;
import org.elsysbg.ip.jobs.entities.Administrator;
import org.elsysbg.ip.jobs.entities.Employer;
import org.elsysbg.ip.jobs.entities.NormalUser;

@Singleton
public class AuthenticationService {
	private final Provider<NormalUsersService> normalUsersServiceProvider;
	private final Provider<EmployersService> employersServiceProvider;
	private final Provider<AdministratorsService> administratorsServiceProvider;

	@Inject
	public AuthenticationService(Provider<NormalUsersService> normalUsersServiceProvider, Provider<EmployersService> employersServiceProvider, Provider<AdministratorsService> administratorsServiceProvider) {
		this.normalUsersServiceProvider = normalUsersServiceProvider;
		this.employersServiceProvider = employersServiceProvider;
		this.administratorsServiceProvider = administratorsServiceProvider;
	}

	public NormalUser getCurrentlyLoggedInNormalUser(Subject subject) {
		final String username = (String) subject.getPrincipal();
		if (username == null) {
			return null;
		}
		return normalUsersServiceProvider.get().getNormalUserByUsername(username);
	}
	
	public Employer getCurrentlyLoggedInEmployer(Subject subject) {
		final String username = (String) subject.getPrincipal();
		if (username == null) {
			return null;
		}
		return employersServiceProvider.get().getEmployerByUsername(username);
	}
	
	public Administrator getCurrentlyLoggedInAdministrator(Subject subject) {
		final String username = (String) subject.getPrincipal();
		if (username == null) {
			return null;
		}
		return administratorsServiceProvider.get().getAdministratorByUsername(username);
	}

	public String encryptPassword(String password) {
		final PasswordService passwordService = getPasswordService();
		return passwordService.encryptPassword(password);
	}

	private PasswordService getPasswordService() {
		final RealmSecurityManager securityManager = (RealmSecurityManager) SecurityUtils.getSecurityManager();
		final Collection<Realm> realms = securityManager.getRealms();
		PasswordMatcher credentialsMatcher = null;
		for (Realm next : realms) {
			if (next instanceof AuthenticatingRealm) {
				final AuthenticatingRealm authenticatingRealm = (AuthenticatingRealm) next;
				if (authenticatingRealm.getCredentialsMatcher() instanceof PasswordMatcher) {
					credentialsMatcher = (PasswordMatcher) authenticatingRealm.getCredentialsMatcher();
					break;
				}
			}
		}
		if (credentialsMatcher == null) {
			throw new IllegalStateException("Bad configuration");
		}
		return credentialsMatcher.getPasswordService();
	}

	public void login(Subject subject, String username, String password) {
		final UsernamePasswordToken token = new UsernamePasswordToken(username, password);
		subject.login(token);
	}
	
	public void logout(Subject subject) {
		subject.logout();
	}
}
