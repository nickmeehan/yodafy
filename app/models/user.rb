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

  def self.all_contacts(current_user)
  	contacts = self.find(current_user).contacts.order("name ASC")
  end

  def send_message(content, contact_id = 0)
		account_sid = ENV['ACCOUNT_SID']
		auth_token = ENV['AUTH_TOKEN']
		
		if content.match(/<html>/)
			return "failure"
		end

		begin
			@client = Twilio::REST::Client.new account_sid, auth_token
			# The :to and :from in this case will change depending on the User and the Contact
			# :from => self.phone_number
			# :to => Contact.find(contact_id).phone_number
			message = @client.account.messages.create(
				:body => "#{content}",
			  :to => ENV['MY_NUMBER'],
			  :from => ENV['TWILIO_NUMBER']
		  )
		rescue Twilio::REST::RequestError => e
			error = e.message
		end

		if error
			return error
		else
			self.messages.create(content: message.body, contact_id: contact_id, message_sid: message.sid)
			return "success"
		end
  end
end
