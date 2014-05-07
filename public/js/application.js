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
		$('.homepage').on('click', '.save_contact', this.addNewContact.bind(this))
		$('.homepage').on('click', '.homepage_contact', this.getContactProfile.bind(this))
		$('.homepage').on('click', '.contact_links .update_contact', this.getUpdateContactForm.bind(this))
		$('.homepage').on('click', '.contact_links .delete_contact', this.deleteContactInfo.bind(this))
		$('.homepage').on('click', '.save_update', this.updateContactInfo.bind(this))
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
		ajaxRequest.done(this.view.displayNewMessageBox.bind(this))
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
	},
	getAllContacts: function(event) {
		event.preventDefault();
		console.log(event.target.href)
		var ajaxRequest = $.ajax({
			url: event.target.href,
			type: 'GET'
		})
		ajaxRequest.done(this.view.displayAllContacts.bind(this))
	},
	getAddContactBox: function(event) {
		event.preventDefault();
		console.log(event.target.href)
		this.view.hideMessages();
		var ajaxRequest = $.ajax({
			url: event.target.href,
			type: 'GET'
		})
		ajaxRequest.done(this.view.displayNewContactForm.bind(this))
	},
	addNewContact: function(event) {
		event.preventDefault();
		console.log(event)
		var ajaxRequest = $.ajax({
			url: event.target.form.action,
			type: 'POST',
			data: { 
				name: event.target.form[0].value, 
				phone_number: event.target.form[1].value 
			}
		})
		ajaxRequest.done(this.view.displayNewContactConfirmation.bind(this))
		ajaxRequest.fail(this.view.displayNewContactFailure.bind(this))
	},
	getContactProfile: function(event) {
		event.preventDefault()
		console.log(event.target.href)
		var ajaxRequest = $.ajax({
			url: event.target.href,
			type: 'GET'
		})
		ajaxRequest.done(this.view.displayContactProfile.bind(this))
	},
	getUpdateContactForm: function(event) {
		event.preventDefault();
		console.log(event.target.href)
		var ajaxRequest = $.ajax({
			url: event.target.href,
			type: 'GET'
		})
		ajaxRequest.done(this.view.displayUpdateForm.bind(this))
	},
	updateContactInfo: function(event) {
		event.preventDefault();
		console.log(event)
		var ajaxRequest = $.ajax({
			url: event.target.form.action,
			type: 'PUT',
			data: { 
				name: event.target.form[0].value, 
				phone_number: event.target.form[1].value 
			}
		})
		ajaxRequest.done(this.view.displayContactProfile.bind(this))
	},
	deleteContactInfo: function(event) {
		event.preventDefault();
		console.log(event.target.href)
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
	removeSectionContent: function() {
		$('.homepage_contact').remove();
		$('.add_contact').remove();
		$('.contact_message').remove();
		$('.profile').remove();
		$('.update_contact_form').remove();
	},
	displayNewMessageBox: function(response) {
		this.view.hideMessages()
		this.view.removeSectionContent()
		$('.homepage').prepend(response);
	},
	displayNewYodaMessage: function(response) {
		var newYodaMessage = $('.yoda_message').clone();
		var readyMessage = this.view.newYodaMessageHelper(newYodaMessage, response);
		this.view.unhideMessages()
		$('.homepage').prepend(readyMessage);
	},
	newYodaMessageHelper: function(message, response) {
		message.find('.yoda_content').text(response);
		$(message).css('display', 'block');
		$(message).removeClass('yoda_message');
		this.view.removeSectionContent()
		return message
	},
	displayNewYodaMessageErrors: function(response) {
		if (response.status === 500) {
			alert("An error occurred. Please try again later.")
		} else {
			parsedResponse = $.parseJSON(response.responseText);
			alert(parsedResponse.error);
		}
		// $('.contact_message').remove();
		this.view.removeSectionContent();
	},
	hideMessages: function() {
		$('article').css('display', 'none');
	},
	unhideMessages: function() {
		$('article').css('display', 'block');		
	},
	displayNewContactForm: function(response) {
		this.view.removeSectionContent()
		$('.homepage').prepend(response);
	},
	displayNewContactConfirmation: function(response) {
		this.view.removeSectionContent();
		this.view.unhideMessages();
		alert(response["success"]);
	},
	displayNewContactFailure: function(response) {
		this.view.removeSectionContent();
		this.view.unhideMessages();
		alert(response["errors"]);		
	},
	displayAllContacts: function(response) {
		console.log(response);
		this.view.hideMessages();
		this.view.removeSectionContent();
		$('.homepage').prepend(response);

	},
	displayContactProfile: function(response) {
		console.log(response.contact)
		var profileTemplate = $('.contact').clone();
		var contactProfile = this.view.contactProfileHelper(profileTemplate, response.contact)
		this.view.removeSectionContent();
		$('.homepage').prepend(contactProfile);
	},
	contactProfileHelper: function(contactTemplate, contactInfo) {
		contactTemplate.find('.contact_name').text(contactInfo.name)
		contactTemplate.find('.contact_number').text(contactInfo.phone_number)
		contactTemplate.find('.contact_messages').attr('href', '/contacts/' + contactInfo.id + '/messages')
		contactTemplate.find('.update_contact').attr('href', '/contacts/' + contactInfo.id + '/edit')
		contactTemplate.find('.delete_contact').attr('href', '/contacts/' + contactInfo.id)
		$(contactTemplate).addClass('profile');
		$(contactTemplate).css('display', 'block');
		return contactTemplate
	},
	displayUpdateForm: function(response) {
		console.log(response)
		this.view.removeSectionContent()
		$('.homepage').prepend(response)
	}
}