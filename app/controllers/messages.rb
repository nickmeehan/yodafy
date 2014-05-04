get '/messages/new' do
	@contacts = User.find(current_user).contacts
	erb :_new_message_with_contacts, layout: false
end

post '/messages' do
	# content = Message.convert_to_yoda(params[:content])
	# contact_id = params[:contact_id]
	string = params[:content]

	# This method will need to be changed once contacts are instituted
	# and it will become an instance method for the current user.
	# User.find(current_user).send_message(content, contact_id)
	message_status = User.send_message(string)

	p message_status

	if message_status == "success"
		status 200
		content_type :json
		string.to_json
	else
		status 422
		content_type :json
		message_status.to_json
	end
	# response.body.to_json
end

