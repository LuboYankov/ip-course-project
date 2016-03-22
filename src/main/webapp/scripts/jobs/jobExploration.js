$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:3000/jobs";
	var USERS_ENDPOINT = "http://localhost:3000/users";
	
	function getUserUrl(userId) {
		return USERS_ENDPOINT + "/" + userId;
	}
	
	function getJobs() {
		return $.ajax(ENDPOINT, {
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
	
	function showJobs() {
		getJobs().then(function(response) {
			function showJobView(job) {
				var divContainer = $("<div />");
				var divThumbnail = $("<div />");
				var divCaption = $("<div />");
				var h4Title = $("<h4 />");
				var h4Salary = $("<h4 />");
				var pDescription = $("<p />");
				divContainer.addClass("col-sm-4 col-lg-4 col-md-4");
				divThumbnail.addClass("thumbnail");
				divCaption.addClass("caption");
				h4Salary.addClass("pull-right");
				pDescription.text(job.description);
				h4Title.text(job.title);
				h4Salary.text("$"+job.salary);
				divCaption.append(h4Salary);
				divCaption.append(h4Title);
				divCaption.append(pDescription);
				divThumbnail.append(divCaption);
				divContainer.attr("data-job-id", job.id);
				divContainer.append(divThumbnail);
				$(".col-md-9 .row").append(divContainer);
			}
			$(".col-md-9 .row").html("");
			_.forEach(response, showJobView);
		});
	}
	
	function attachActionListeners() {
		$(document).on("click", "[data-job-id]", function() {
			window.location.href = "viewJob.html?id="+ $(this).attr("data-job-id");
		});
		
		$("#logout").click(function() {
			 document.cookie = 'session=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			 window.location.href = "../index.html";
		});
	}
	
	function showUser(user) {
		var li = $("<li />");
		li.append("<a href='#'>" + user.username + "</a>")
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
	
	function getCurrentUser() {
		var cookie = getCookie("session");
		getUser(cookie).then(function(response) {
			showUser(response);
		});
	}
	
	showJobs();
	attachActionListeners();
	getCurrentUser();
});