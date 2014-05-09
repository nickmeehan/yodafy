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

