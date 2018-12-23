$(document).ready(function() {
	initializePage();
	$('input#confirm').hide();	
});

function initializePage() {
/*
	$("#signup").click(function () {
		var username = $('#username').val();
		var password = $('#password').val();
		username = username.replace(/\s+/g, '');
		password = password.replace(/\s+/g, '');
		if (localStorage.getItem(username)) {
	    	window.alert("This username has already been used!");
		}
		else if (username.length == 0) {
			window.alert("Username is empty!");
		}
		else if (password.length == 0) {
			window.alert("Password is empty!");
		}
		else {
			localStorage.setItem(username, password);
			window.alert("You're signed up! Try logging in now!");
		}
	});
*/
	$("#login-signup-btn").click(function () {
	    var username = $('#username').val();
		var password = $('#password').val();
		username = username.replace(/\s+/g, '');
		if (username.length == 0) {
			window.alert("Username is empty!");
			return;
		}
		else if (password.length == 0) {
			window.alert("Password is empty!");
			return;
		}
		var mode = $('.switch-mode').data('switch');
		var confirm = $('#confirm').val();
		if (mode == "login") {
			if (localStorage.getItem(username) != password) {
				window.alert("Username or password is wrong.");
			}
			else {
				localStorage.setItem("currentUser", username);
				window.location.href='breweries2.html';
			}
		}
		else {
			if (localStorage.getItem(username)) {
		    	window.alert("This username has already been used!");
			}
			else if (confirm != password) {
				window.alert("Password confirmation doesn't match!");
			}
			else {
				localStorage.setItem(username, password);
				window.alert("You're signed up! Try logging in now!");
				switchMode();
			}
		}
	});

	$(".switch-mode").click(function() {
		switchMode()
	});

	
}

function switchMode() {
	var mode = $('.switch-mode').data('switch');
	if (mode == "login") {
		$('.switch-mode').data('switch', 'signup');
		$('.switch-mode').fadeOut(500, function() {
        	$(this).text('Cancel').fadeIn(500);
    	});
		$('.index-title').fadeOut(500, function() {
        	$(this).text('Create Account').fadeIn(500);
    	});
		$('#login-signup-btn').fadeOut(500, function() {
        	$(this).text('Sign Up').fadeIn(500);
    	});
    	$('#username').fadeOut(500, function() {
        	$(this).fadeIn(500);
    	});
		$('#password').fadeOut(500, function() {
        	$(this).fadeIn(500);
    	});
		$('.logo').fadeOut(500, function() {
        	$('#confirm').fadeIn(500);
    	});
	}
	else {
		$('.switch-mode').data('switch', 'login');
		$('.switch-mode').fadeOut(500, function() {
       		$(this).text("Don't have an account? Sign up").fadeIn(500);
    	});
		$('.index-title').fadeOut(500, function() {
       		$(this).text('Beermenter').fadeIn(500);
    	});
		$('#login-signup-btn').fadeOut(500, function() {
       		$(this).text('Log In').fadeIn(500);
    	});
    	$('#username').fadeOut(500, function() {
       		$(this).fadeIn(500);
    	});
		$('#password').fadeOut(500, function() {
       		$(this).fadeIn(500);
    	});
		$('#confirm').fadeOut(500, function() {
       		$('.logo').fadeIn(500);
    	});
	}
}