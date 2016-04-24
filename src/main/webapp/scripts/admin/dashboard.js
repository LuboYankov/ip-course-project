$(document).ready(function() {
	"use strict";
	
	var JOBS_ENDPOINT = "http://localhost:8080/Jobs/api/v1/jobs";
	var USERS_ENDPOINT = "http://localhost:8080/Jobs/api/v1/users";
	var EMPLOYERS_ENDPOINT = "http://localhost:8080/Jobs/api/v1/employers";
	var ADMINS_ENDPOINT = "http://localhost:8080/Jobs/api/v1/administrators";
	var DEFAULT_AUTH_ENDPOINT = "http://localhost:8080/Jobs/api/v1/authentication";
	var AUTH_ENDPOINT = "http://localhost:8080/Jobs/api/v1/authentication/administrators"
	
	function getJobs() {
		return $.ajax(JOBS_ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function getUsers() {
		return $.ajax(USERS_ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function getEmployers() {
		return $.ajax(EMPLOYERS_ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function getAdmins() {
		return $.ajax(ADMINS_ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function getJobUrl(jobId) {
		return JOBS_ENDPOINT + "/" + jobId;
	}
	
	function getUserUrl(userId) {
		return USERS_ENDPOINT + "/" + userId;
	}
	
	function getEmployerUrl(employerId) {
		return EMPLOYERS_ENDPOINT + "/" + employerId;
	}
	
	function getAdminUrl(adminId) {
		return ADMINS_ENDPOINT + "/" + adminId;
	}
	
	function getJob(jobId) {
		return $.ajax(getJobUrl(jobId), {
			method: "GET",
			dataType: "json"
		});
	}
	
	function getUser(userId) {
		return $.ajax(getUserUrl(userId), {
			method: "GET",
			dataType: "json"
		});
	}
	
	function getEmployer(employerId) {
		return $.ajax(getEmployerUrl(employerId), {
			method: "GET",
			dataType: "json"
		});
	}
	
	function getAdmin(adminId) {
		return $.ajax(getAdminUrl(adminId), {
			method: "GET",
			dataType: "json"
		});
	}
	
	function deleteJob(jobId) {
		$.ajax(getJobUrl(jobId), {
			method: "DELETE"
		});
	}
	
	function deleteUser(userId) {
		$.ajax(getUserUrl(userId), {
			method: "DELETE"
		});
	}
	
	function deleteEmployer(employerId) {
		$.ajax(getEmployerUrl(employerId), {
			method: "DELETE"
		});
	}
	
	function deleteAdmin(adminId) {
		$.ajax(getAdminUrl(adminId), {
			method: "DELETE"
		});
	}
	
	function hideAllContainers() {
		var ALL_CONTAINERS = ["jobs-container", "users-container", "employers-container", "admins-container"];
		_.forEach(ALL_CONTAINERS, function(container) {
			$("#"+container).hide();
		});
	}
	
	function showContainer(name) {
		hideAllContainers();
		$("#"+name).show();
		showPanel("emptyPanel");
	}
	
	function showPanel(name) {
		var ALL_PANELS = ["emptyPanel", "jobReadPanel", "userReadPanel", "employerReadPanel", "adminReadPanel", "adminRegistrationPanel", "adminUpdatePanel"];
		_.forEach(ALL_PANELS, function(panel) {
			$("#"+panel).hide();
		});
		$("#"+name).show();
		$("li.active").removeClass("active");
	}
	
	function showAdmin(admin) {
		var li = $("<li />");
		li.append("<a href='#'>" + admin.username + "</a>")
		$(".navbar-nav").prepend(li);
	}
	
	
	function getCurrentAdmin() {
		$.ajax(AUTH_ENDPOINT, {
			method: "GET",
			dataType: "json"
		}).then(function(response) {
			showAdmin(response);
		});
	}
	
	function showAllJobs() {
		showContainer("jobs-container");
		getJobs().then(function(response) {
			function showJob(job) {
				var li = $("<li />");
				li.text(job.title);
				li.attr("class", "list-group-item");
				li.attr("data-job-id", job.id);
				$("#list-jobs").append(li);
			}
			$("#list-jobs").html("");
			_.forEach(response, showJob);
		});
	}
	
	function showAllUsers() {
		showContainer("users-container");
		getUsers().then(function(response) {
			function showUser(user) {
				var li = $("<li />");
				li.text(user.username);
				li.attr("class", "list-group-item");
				li.attr("data-user-id", user.id);
				$("#list-users").append(li);
			}
			$("#list-users").html("");
			_.forEach(response, showUser);
		});
	}
	
	function showAllEmployers() {
		showContainer("employers-container");
		getEmployers().then(function(response) {
			function showEmployer(employer) {
				var li = $("<li />");
				li.text(employer.username);
				li.attr("class", "list-group-item");
				li.attr("data-employer-id", employer.id);
				$("#list-employers").append(li);
			}
			$("#list-employers").html("");
			_.forEach(response, showEmployer);
		});
	}
	
	function showAllAdmins() {
		showContainer("admins-container");
		getAdmins().then(function(response) {
			function showAdmin(admin) {
				var li = $("<li />");
				li.text(admin.username);
				li.attr("class", "list-group-item");
				li.attr("data-admin-id", admin.id);
				$("#list-admins").append(li);
			}
			$("#list-admins").html("");
			_.forEach(response, showAdmin);
		});
	}
	
	function showJobView(job) {
		$("#jobReadPanel .job-title").text(job.title);
		$("#jobReadPanel .job-description").text(job.description);
		$("#jobReadPanel .job-salary").text("$"+job.salary);
		$("#jobReadPanel .job-type").text(job.jobType);
		$("#jobReadPanel .job-category").text(job.jobCategory);
		showPanel("jobReadPanel");
		$("#list-jobs li[data-job-id='"+job.id+"']").addClass("active");
	}
	
	function showUserView(user) {
		$("#userReadPanel .user-username").text(user.username);
		$("#userReadPanel .user-name").text(user.name);
		$("#userReadPanel .user-email").text(user.email);
		$("#userReadPanel .user-phone").text(user.phone);
		showPanel("userReadPanel");
		$("#list-users li[data-user-id='"+user.id+"']").addClass("active");
	}
	
	function showEmployerView(employer) {
		$("#employerReadPanel .employer-username").text(employer.username);
		$("#employerReadPanel .employer-name").text(employer.name);
		$("#employerReadPanel .employer-email").text(employer.email);
		$("#employerReadPanel .employer-phone").text(employer.phone);
		showPanel("employerReadPanel");
		$("#list-employers li[data-employer-id='"+employer.id+"']").addClass("active");
	}
	
	function showAdminView(admin) {
		$("#adminReadPanel .admin-username").text(admin.username);
		$("#adminReadPanel .admin-name").text(admin.name);
		$("#adminReadPanel .admin-email").text(admin.email);
		showPanel("adminReadPanel");
		$("#list-admins li[data-admin-id='"+admin.id+"']").addClass("active");
	}
	
	function registerAdmin() {
		var adminParams = {
				username: $("#adminRegistrationPanel [name='username']").val(),
				name: $("#adminRegistrationPanel [name='name']").val(),
				email: $("#adminRegistrationPanel [name='email']").val(),
				phone: $("#adminRegistrationPanel [name='phone']").val(),
				password: $("#adminRegistrationPanel [name='password']").val()
		}
		return $.ajax(ADMINS_ENDPOINT, {
			method: "POST",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(adminParams),
			dataType: "json"
		}).then(function(response) {
			showAdminView(response);
		});
	}
	
	function updateAdminFields(admin) {
		showPanel("adminUpdatePanel");
		$("#adminUpdatePanel [name='username']").val(admin.username);
		$("#adminUpdatePanel [name='name']").val(admin.name);
		$("#adminUpdatePanel [name='email']").val(admin.email);
		$("#adminUpdatePanel [name='phone']").val(admin.phone);
	}
	
	function updateAdmin(adminId) {
		var admin = {
				username: $("#adminUpdatePanel [name='username']").val(),
				name: $("#adminUpdatePanel [name='name']").val(),
				email: $("#adminUpdatePanel [name='email']").val(),
				phone: $("#adminUpdatePanel [name='phone']").val()
		}
		return $.ajax(ADMINS_ENDPOINT + "/" + adminId, {
			method: "PUT",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(admin),
			dataType: "json"
		}).then(function(response) {
			showAdminView(response);
		});
	}
	
	function attachActionListeners() {
		var clickedJobId = null;
		$(document).on("click", "#list-jobs [data-job-id]", function() {
			clickedJobId = $(this).attr("data-job-id");
			getJob(clickedJobId).then(showJobView);
		});
		
		var clickedUserId = null;
		$(document).on("click", "#list-users [data-user-id]", function() {
			clickedUserId = $(this).attr("data-user-id");
			getUser(clickedUserId).then(showUserView);
		});
		
		var clickedEmployerId = null;
		$(document).on("click", "#list-employers [data-employer-id]", function() {
			clickedEmployerId = $(this).attr("data-employer-id");
			getEmployer(clickedEmployerId).then(showEmployerView);
		});
		
		var clickedAdminId = null;
		$(document).on("click", "#list-admins [data-admin-id]", function() {
			clickedAdminId = $(this).attr("data-admin-id");
			getAdmin(clickedAdminId).then(showAdminView);
		});
		
		$(".job-action-remove").click(function() {
			deleteJob(clickedJobId);
		});
		
		$(".user-action-remove").click(function() {
			deleteUser(clickedUserId);
		});
		
		$(".employer-action-remove").click(function() {
			deleteEmployer(clickedEmployerId);
		});
		
		$(".admin-action-remove").click(function() {
			deleteAdmin(clickedAdminId);
		});
		
		$("#jobs-link").click(function() {
			showAllJobs();
		});
		
		$("#users-link").click(function() {
			showAllUsers();
		});
		
		$("#employers-link").click(function() {
			showAllEmployers();
		});
		
		$("#admins-link").click(function() {
			showAllAdmins();
		});
		
		$("#admins-registration").click(function() {
			hideAllContainers();
			showPanel("adminRegistrationPanel");
		});
		
		$("#admin-create-action").click(function() {
			registerAdmin();
		});
		
		$(".admin-action-edit").click(function() {
			getAdmin(clickedAdminId).then(function(response) {
				updateAdminFields(response);
			});
		});
		
		$("#adminUpdatePanel #update-action").click(function() {
			updateAdmin(clickedAdminId);
		});
		
		$("#logout").click(function() {
			 $.ajax(DEFAULT_AUTH_ENDPOINT, {
				method: "DELETE" 
			 }).then(function(response) {
				 window.location.href = "../index.html";
			 });
		});
	}
	
	getCurrentAdmin();
	attachActionListeners();
});