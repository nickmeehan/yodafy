get '/messages/new' do
	@contacts = User.find(current_user).contacts
	erb :_new_message_with_contacts, layout: false
end

post '/messages' do
	content = Message.convert_to_yoda(params[:content])

	# This method will need to be changed once contacts are instituted
	User.send_message(content)

	

  p message.sid







	content_type :json

	string.to_json
	# response.body.to_json
end

