$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  var view = new View();
  var controller = new Controller(view);
  controller.bindListeners();
});


function Controller(view) {
	this.view = view;
}


Controller.prototype = {
	bindListeners: function() {
		$('.container').on('click', '.signin', this.getSignInForm.bind(this))
		$('.container').on('click', '.signup', this.getSignUpForm.bind(this))
		$('nav').on('click', '#add_message', this.getAddMessageBox.bind(this))
		$('nav').on('click', '#all_contacts', this.getAllContacts.bind(this))
		$('nav').on('click', '#add_contact', this.getAddContactBox.bind(this))
	},
	getSignInForm: function(event) {
		event.preventDefault();
		var ajaxRequest = $.ajax({
			url: event.target.href,
			type: 'GET'
		})
		ajaxRequest.done(this.view.displaySignInForm);
	},
	getSignUpForm: function(event) {
		event.preventDefault();
		var ajaxRequest = $.ajax({
			url: event.target.href,
			type: 'GET'
		})
		ajaxRequest.done(this.view.displaySignUpForm)
	},
	getAddMessageBox: function(event) {
		event.preventDefault();
		console.log(event.target.href)
	},
	getAllContacts: function(event) {
		event.preventDefault();
		console.log(event.target.href)
	},
	getAddContactBox: function(event) {
		event.preventDefault();
		console.log(event.target.href)
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