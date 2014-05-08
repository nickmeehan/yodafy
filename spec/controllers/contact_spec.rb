require 'spec_helper'

describe "get /contacts/new route" do
	
	it "sends a new contact form" do
		## Arrange

		## Act
		get '/contacts/new'

		## Assert
		expect(last_response.body).to include("add_contact_form")
	end

end

describe "post /contacts route" do

	it "saves a new contact to the database" do
		## Arrange
		User.destroy_all
		@user = User.create(phone_number: "+14033130220",
												email: "nick@nick.ca",
												password: "password")
		fake_session = { 'rack.session' => { user_id: @user.id } }
		params = { phone_number: "+14039991234", name: "Han Solo" }

		## Act
		post '/contacts', params, fake_session

		## Assert
		expect(User.find(@user.id).contacts.count).to eq(1)

	end

	it "sends a success message in json if contact is saved" do
		## Arrange
		User.destroy_all
		@user = User.create(phone_number: "+14033130220",
												email: "nick@nick.ca",
												password: "password")
		fake_session = { 'rack.session' => { user_id: @user.id } }
		params = { phone_number: "+14039991234", name: "Han Solo" }

		## Act
		post '/contacts', params, fake_session

		## Assert
		expected_output = { success: "A new padawan, you have." }.to_json
		expect(last_response.body).to eq(expected_output)

	end

end