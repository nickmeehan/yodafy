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
		var ajaxRequest = $.ajax({
			url: event.target.href,
			type: 'DELETE'
		})
		ajaxRequest.done(this.view.refreshPage)
		ajaxRequest.fail(this.view.displayDeletionErrors)
	}
}