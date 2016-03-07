$(document).ready(function() {
	"use strict";
	
	var ENDPOINT = "http://localhost:3000/jobs"
		
	function loadActionListeners() {
		$(".job-action-create").click(function() {
			var job = {
					title: $("[name='title']").val(),
					description: $("[name='description']").val(),
					salary: $("[name='salary']").val(),
					location: $("[name='location']").val(),
					jobType: $("[name='jobType']").val(),
					jobCategory: $("[name='jobCategory']").val(),
					author: $("[name='author']").val()
			}
			
			$.ajax(ENDPOINT, {
				method: "POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify(job),
				dataType: "json"
			}).then(function(response) {
				window.location.href = "viewJob.html?id="+response.id;
			});
		});
	}
	
	loadActionListeners();
});