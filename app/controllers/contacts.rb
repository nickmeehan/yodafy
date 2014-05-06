get '/contacts/new' do
	erb :_new_contact_form, layout: false
end

post '/contacts' do
	@new_contact = User.find(current_user).contacts.new(params)
	if @new_contact.save
		status 200
		content_type :json
		{ success: "A new padawan, you have." }.to_json
	else
		status 422
		content_type :json
		{ errors: @new_contact.errors.full_messages }.to_json
	end
end

get '/contacts/all' do
	@contacts = User.all_contacts(current_user)
	erb :_all_contacts, layout: false
end

get '/contacts/:id' do


end