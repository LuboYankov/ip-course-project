$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:8080/Jobs/api/v1/jobs";
	var EMPLOYERS_ENDPOINT = "http://localhost:8080/Jobs/api/v1/employers";
	
	function getEmployerUrl(employerId) {
		return EMPLOYERS_ENDPOINT + "/" + employerId;
	}
	
	function getEmployer(employerId) {
		return $.ajax(getEmployerUrl(employerId), {
			method: "GET",
			dataType: "json"
		});
	}
	
	function getEmployerId() {
		var cookies = document.cookie;
		return cookies.split("=")[1];
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
	
	function createJob() {
		var job = {
				title: $("[name='title']").val(),
				description: $("[name='description']").val(),
				location: $("[name='location']").val(),
				jobType: $("[name='jobType']").val(),
				jobCategory: $("[name='jobCategory']").val(),
				salary: $("[name='salary']").val()
		}
		
		$.ajax(ENDPOINT, {
			method: "POST",
			contentType: "application/json; charset=utf-8",
			data: JSON.stringify(job),
			dataType: "json"
		}).then(function(response) {
			window.location.href = "../employers/viewJob.html?id=" + response.id;
		});
	}
		
	function loadActionListeners() {
		$(".job-action-create").click(function() {
			createJob();
		});
	}
	
	loadActionListeners();
});