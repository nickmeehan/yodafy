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
	@contact = User.find(current_user).contacts.find(params[:id])
	content_type :json
	@contact.to_json
end

get '/contacts/:id/edit' do
	@contact = User.find(current_user).contacts.find(params[:id])
	erb :_update_contact_form, layout: false	
end

put '/contacts/:id' do
	User.find(current_user).contacts.find(params[:id]).update_attributes(
		name: params[:name],
		phone_number: params[:phone_number])
	@contact = User.find(current_user).contacts.find(params[:id])
	content_type :json
	@contact.to_json
end

delete '/contacts/:id' do
	begin
		User.find(current_user).contacts.find(params[:id]).destroy
	rescue StandardError => e
		@errors = e.message
	end

	if @errors
		status 422
		content_type :json
		@errors.to_json
	else
		status 200
	end
end