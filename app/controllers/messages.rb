get '/messages/new' do
	@contacts = User.find(current_user).contacts
	erb :_new_message_with_contacts, layout: false
end

post '/messages' do
	content = Message.convert_to_yoda(params[:content])
	# contact_id = params[:contact_id]
	string = params[:content]

	# This method will need to be changed once contacts are instituted
	# and it will become an instance method for the current user.
	# User.find(current_user).send_message(content, contact_id)
	User.send_message(content)






	content_type :json

	string.to_json
	# response.body.to_json
end

