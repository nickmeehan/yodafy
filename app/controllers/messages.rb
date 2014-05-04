get '/messages/new' do
	@contacts = User.find(current_user).contacts
	erb :_new_message_with_contacts, layout: false
end

post '/messages' do
	
end