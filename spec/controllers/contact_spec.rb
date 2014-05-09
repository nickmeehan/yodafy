require 'spec_helper'

describe "get /contacts/new route" do
	
	it "sends a new contact form" do
		## Arrange

		## Act
		get "/contacts/new"

		## Assert
		expect(last_response.body).to include("add_contact_form")
	end

end

describe "post /contacts route" do

	it "saves a new contact to the database" do
		## Arrange
		User.destroy_all
		@user = User.create(phone_number: "+14033030220",
												email: "nick@nick.ca",
												password: "password")
		fake_session = { 'rack.session' => { user_id: @user.id } }
		params = { phone_number: "+14039991234", name: "Han Solo" }

		## Act
		post "/contacts", params, fake_session

		## Assert
		expect(User.find(@user.id).contacts.count).to eq(1)

	end

	it "sends a success message in json if contact is saved" do
		## Arrange
		User.destroy_all
		@user = User.create(phone_number: "+14033030220",
												email: "nick@nick.ca",
												password: "password")
		fake_session = { 'rack.session' => { user_id: @user.id } }
		params = { phone_number: "+14039991234", name: "Han Solo" }

		## Act
		post "/contacts", params, fake_session

		## Assert
		expected_output = { success: "A new padawan, you have." }.to_json
		expect(last_response.body).to eq(expected_output)

	end

	it "sends an error message as json string" do
		## Arrange
		User.destroy_all
		@user = User.create(phone_number: "+14033030220",
												email: "nick@nick.ca",
												password: "password")
		fake_session = { 'rack.session' => { user_id: @user.id } }
		params = { phone_number: "+14039991234" }

		## Act
		post "/contacts", params, fake_session

		## Assert
		expected_output = { errors: ["Name can't be blank"] }.to_json
		expect(last_response.body).to eq(expected_output)

	end

end

describe "get /contacts/:id route" do

	it "sends back the correct contact information as a json string" do
		## Arrange
		User.destroy_all
		Contact.destroy_all
		@user = User.create(phone_number: "+14033030220",
												email: "nick@nick.ca",
												password: "password")
		@contact = Contact.create(phone_number: "+14039991234", name: "Han Solo")
		@user.contacts << @contact
		params = { id: @contact.id }
		fake_session = { 'rack.session' => { user_id: @user.id } }

		## Act
		get "/contacts/#{@contact.id}", params, fake_session

		## Assert
		expect(last_response.body).to eq(@contact.to_json)

	end

end

describe "get /contacts/all route" do

	it "sends back a partial with all contacts' information" do
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
		get "/contacts/all", params, fake_session

		# Assert
		expect(last_response.body).to include("#{@contact1.name}")
		expect(last_response.body).to include("#{@contact2.name}")

	end

end

describe "get /contacts/:id/edit route" do

	it "should return a pre-populated form with contact's information" do
		## Arrange
		User.destroy_all
		Contact.destroy_all
		@user = User.create(phone_number: "+14033030220",
												email: "nick@nick.ca",
												password: "password")
		@contact = Contact.create(phone_number: "+14039991234", name: "Han Solo")
		@user.contacts << @contact
		params = { id: @contact.id }
		fake_session = { 'rack.session' => { user_id: @user.id } }

		## Act
		get "/contacts/#{@contact.id}/edit", params, fake_session

		## Assert
		expect(last_response.body).to include("#{@contact.name}")
		expect(last_response.body).to include("#{@contact.phone_number}")
		expect(last_response.body).to include("update_contact_form")

	end

end

describe "put /contacts/:id route" do

	it "should return a pre-populated form with the contact's information" do
		## Arrange
		User.destroy_all
		Contact.destroy_all
		@user = User.create(phone_number: "+14033030220",
												email: "nick@nick.ca",
												password: "password")
		@contact = Contact.create(phone_number: "+14039991234", name: "Han Solo")
		@user.contacts << @contact
		params = { id: @contact.id,
							 name: "Luke Skywalker",
							 phone_number: "+14035647382" }
		fake_session = { 'rack.session' => { user_id: @user.id } }

		## Act
		put "/contacts/#{@contact.id}", params, fake_session

		## Assert
		@contact.update_attributes(name: "Luke Skywalker", phone_number: "+14035647382")
		expected_output = @contact.to_json
		expect(last_response.body).to eq(expected_output)

	end

end

describe "delete /contacts/:id route" do

	it "should delete the contact from the database" do
		## Arrange
		User.destroy_all
		Contact.destroy_all
		@user = User.create(phone_number: "+14033030220",
												email: "nick@nick.ca",
												password: "password")
		@contact = Contact.create(phone_number: "+14039991234", name: "Han Solo")
		@user.contacts << @contact
		fake_session = { 'rack.session' => { user_id: @user.id } }
		params = { id: @contact.id }

		## Act
		delete "/contacts/#{@contact.id}", params, fake_session

		## Assert
		expect(User.find(@user.id).contacts.count).to eq(0)

	end

end





