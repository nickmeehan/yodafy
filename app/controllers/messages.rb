get '/messages/new' do
	@contacts = User.find(current_user).contacts
	erb :_new_message_with_contacts, layout: false
end

post '/messages' do
	string = params[:content].split(" ").join("%20")
	p string

	response = Unirest::get "https://yoda.p.mashape.com/yoda?sentence=#{string}", 
	  headers: { 
	    "X-Mashape-Authorization" => ""
	  }
	content_type :json
	response.body.to_json
end
