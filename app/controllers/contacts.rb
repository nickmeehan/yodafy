get '/contacts/new' do
	erb :_new_contact_form, layout: false
end

post '/contacts' do
	@new_contact = User.find(current_user).contacts.new(params)
	if @new_contact.save
		status 200
	else
		status 422
		content_type :json
		{ errors: @new_contact.errors.full_messages }.to_json
	end
end