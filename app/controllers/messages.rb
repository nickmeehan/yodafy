get '/messages/new' do
	@contacts = User.find(current_user).contacts
	erb :_new_message_with_contacts, layout: false
end

post '/messages' do
	string = params[:content].split(" ").join("%20")

	response = Unirest::get "https://yoda.p.mashape.com/yoda?sentence=You%20will%20learn%20how%20to%20speak%20like%20me%20someday.%20%20Oh%20wait.", 
	  headers: { 
	    "X-Mashape-Authorization" => ENV['YODA_SPEAK']
	  }


	account_sid = ENV['ACCOUNT_SID']
	auth_token = ENV['AUTH_TOKEN']

	@client = Twilio::REST::Client.new account_sid, auth_token
 
	message = @client.account.messages.create(
	:body => "#{string}", #"#{response.body}",
  :to => "+14033702505",     # Replace with your phone number
  :from => "+14378002073")

  p message.sid







	content_type :json
	string.to_json
	# response.body.to_json
end