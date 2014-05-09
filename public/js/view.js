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
		console.log("this should make messages come back")
		this.view.removeSectionContent()
		this.view.unhideMessages()
		$('.homepage').prepend(readyMessage);
	},
	newYodaMessageHelper: function(message, response) {
		message.find('.yoda_content').text(response);
		$(message).css('display', 'block');
		$(message).removeClass('yoda_message');
		$(message).addClass('sent_message')
		return message
	},
	displayNewYodaMessageErrors: function(response) {
		if (response.status === 500) {
			alert("There has been a distrubance in the force.")
		} else {
			parsedResponse = $.parseJSON(response.responseText);
			alert(parsedResponse.error);
		}
		// $('.contact_message').remove();
		this.view.removeSectionContent();
		this.view.unhideMessages();
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
	},
	refreshPage: function(response) {
		location.reload();
	},
	displayDeletionErrors: function(response) {
		console.log(response)
	}
}