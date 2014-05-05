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
		$('nav').on('click', '#new_message', this.getNewMessageBox.bind(this))
		$('nav').on('click', '#all_contacts', this.getAllContacts.bind(this))
		$('nav').on('click', '#add_contact', this.getAddContactBox.bind(this))
		$('.homepage').on('click', '.contact_message .send_message', this.sendNewMessage.bind(this))
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
	getNewMessageBox: function(event) {
		event.preventDefault();
		var ajaxRequest = $.ajax({
			url: event.target.href,
			type: 'GET'
		})
		ajaxRequest.done(this.view.displayNewMessageBox)
	},
	getAllContacts: function(event) {
		event.preventDefault();
		console.log(event.target.href)
	},
	getAddContactBox: function(event) {
		event.preventDefault();
		console.log(event.target.href)
	},
	sendNewMessage: function(event) {
		event.preventDefault();
		// console.log(event.target.form.action)
		// console.log(event.target.form.content.value)
		var ajaxRequest = $.ajax({
			url: event.target.form.action,
			type: 'POST',
			data: { content: event.target.form.content.value }
		})
		ajaxRequest.done(this.view.displayNewYodaMessage.bind(this))
		ajaxRequest.fail(this.view.displayNewYodaMessageErrors.bind(this))
	}
}

function View() {

}

View.prototype = {
	displaySignInForm: function(response) {
		$('.landingpage').remove();
		$('.container').append(response);
	},
	displaySignUpForm: function(response) {
		$('.landingpage').remove();
		$('.container').append(response);
	},
	displayNewMessageBox: function(response) {
		$('.homepage').prepend(response);
	},
	displayNewYodaMessage: function(response) {
		var newYodaMessage = $('.yoda_message').clone();
		var readyMessage = this.view.newYodaMessageHelper(newYodaMessage, response);
		$('.homepage').prepend(readyMessage);
	},
	newYodaMessageHelper: function(message, response) {
		message.find('.yoda_content').text(response);
		$(message).css('display', 'block');
		$(message).removeClass('yoda_message');
		$('.contact_message').remove();
		return message
	},
	displayNewYodaMessageErrors: function(response) {
		if (response.status === 500) {
			alert("An error occurred. Please try again later.")
		} else {
			parsedResponse = $.parseJSON(response.responseText);
			alert(parsedResponse.error);
		}
		$('.contact_message').remove();
	}
}