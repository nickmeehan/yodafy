class User < ActiveRecord::Base
  # Remember to create a migration!
  has_many :contacts
  has_many :messages


  include BCrypt

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end



  def self.send_message(content)
		account_sid = ENV['ACCOUNT_SID']
		auth_token = ENV['AUTH_TOKEN']

		@client = Twilio::REST::Client.new account_sid, auth_token
	 
		message = @client.account.messages.create(
		:body => "#{content}",
	  :to => ENV['MY_NUMBER'],
	  :from => ENV['TWILIO_NUMBER'])
  end
end
