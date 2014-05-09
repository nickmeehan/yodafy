require 'spec_helper'

describe "get /messages/new route" do

	it "sends back a partial with all contacts' names" do
		## Arrange
		User.destroy_all
		Contact.destroy_all
		@user = User.create(phone_number: "+14033030220",
												email: "nick@nick.ca",
												password: "password")
		@contact1 = Contact.create(phone_number: "+14039991234", name: "Han Solo")
		@contact2 = Contact.create(phone_number: "+14039994321", name: "Luke Skywalker")
		@user.contacts << @contact1
		@user.contacts << @contact2
		params = {}
		fake_session = { 'rack.session' => { user_id: @user.id } }

		## Act
		get "/messages/new", params, fake_session

		# Assert
		expect(last_response.body).to include("#{@contact1.name}")
		expect(last_response.body).to include("#{@contact2.name}")
		expect(last_response.body).to include("new_message_form")

	end

end

describe "post /messages route" do

	it "should send a converted string back as a json" do
		## Arrange
		User.destroy_all
		@user = User.create(phone_number: "+14033030220",
												email: "nick@nick.ca",
												password: "password")
		params = { content: "This is just a message." }
		new_content = "Just a message, this is."
		Message.stub(:convert_to_yoda) { new_content }
		message_status = "success"
		User.stub_chain(:find, :send_message) { message_status }
		fake_session = { 'rack.session' => { user_id: @user.id } }

		## Act
		post "/messages", params, fake_session

		# Assert
		expected_output = new_content.to_json
		expect(last_response.body).to eq(expected_output)

	end

	it "should send back an error message when message_status is failure" do
		## Arrange
		User.destroy_all
		@user = User.create(phone_number: "+14033030220",
												email: "nick@nick.ca",
												password: "password")
		params = { content: "This is just a message." }
		new_content = "Just a message, this is."
		Message.stub(:convert_to_yoda) { new_content }
		message_status = "failure"
		User.stub_chain(:find, :send_message) { message_status }
		fake_session = { 'rack.session' => { user_id: @user.id } }

		## Act
		post "/messages", params, fake_session

		# Assert
		expected_output = { error: "There has been a distrubance in the force." }.to_json
		expect(last_response.body).to eq(expected_output)

	end

	it "should send back an error message if error message is an error message" do
		## Arrange
		User.destroy_all
		@user = User.create(phone_number: "+14033030220",
												email: "nick@nick.ca",
												password: "password")
		params = { content: "This is just a message." }
		new_content = "Just a message, this is."
		Message.stub(:convert_to_yoda) { new_content }
		message_status = "The number you've entered is non-existent."
		User.stub_chain(:find, :send_message) { message_status }
		fake_session = { 'rack.session' => { user_id: @user.id } }

		## Act
		post "/messages", params, fake_session

		# Assert
		expected_output = { error: "The number you've entered is non-existent." }.to_json
		expect(last_response.body).to eq(expected_output)

	end

end