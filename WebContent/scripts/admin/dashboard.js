$(document).ready(function() {
	"use strict";
	
	var JOBS_ENDPOINT = "http://localhost:3000/jobs";
	var USERS_ENDPOINT = "http://localhost:3000/users";
	var EMPLOYERS_ENDPOINT = "http://localhost:3000/employers";
	var ADMINS_ENDPOINT = "http://localhost:3000/administrators";
	
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
	
	function showContainer(name) {
		var ALL_CONTAINERS = ["jobs-container", "users-container", "employers-container", "admins-container"];
		_.forEach(ALL_CONTAINERS, function(container) {
			$("#"+container).hide();
		});
		$("#"+name).show();
	}
	
	function showAdmin(admin) {
		var li = $("<li />");
		li.append("<a href='#'>" + admin.username + "</a>")
		$(".navbar-nav").prepend(li);
	}
	
	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	    }
	    return "";
	}
	
	function getCurrentAdmin() {
		var cookie = getCookie("session");
		getAdmin(cookie).then(function(response) {
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
				li.attr("data-employer-id", admin.id);
				$("#list-admins").append(li);
			}
			$("#list-admins").html("");
			_.forEach(response, showAdmin);
		});
	}
	
	function attachActionListeners() {
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
		
		$("#logout").click(function() {
			 document.cookie = 'session=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			 window.location.href = "../index.html";
		});
	}
	
	getCurrentAdmin();
	attachActionListeners();
});