$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  var view = new View();
  controller = new Controller(view);
  controller.bindListeners();
});


function Controller(view) {
	this.view = view;
}


Controller.prototype = {
	bindListeners: function() {
		// console.log(this)
		$('.container').on('click', '.signin', this.getSignInForm)
		$('.container').on('click', '.signup', this.getSignUpForm)
	},
	getSignInForm: function(event) {
		event.preventDefault();
		var ajaxRequest = $.ajax({
			url: this.href,
			type: 'GET'
		})
		ajaxRequest.done(controller.view.displaySignInForm);
	},
	getSignUpForm: function(event) {
		event.preventDefault();
		console.log(this.href)
		var ajaxRequest = $.ajax({
			url: this.href,
			type: 'GET'
		})
		ajaxRequest.done(controller.view.displaySignUpForm)
	}
}

function View() {

}

View.prototype = {
	displaySignInForm: function(response) {
		$('.homepage').remove();
		$('.container').append(response);
	},
	displaySignUpForm: function(response) {
		$('.homepage').remove();
		$('.container').append(response);
	}
}