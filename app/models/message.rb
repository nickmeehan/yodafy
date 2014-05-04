class Message < ActiveRecord::Base
  # Remember to create a migration!
  belongs_to :contact
  belongs_to :user


  def self.convert_to_yoda(content)
  	message = content.split(" ").join("%20")

  	response = Unirest::get "https://yoda.p.mashape.com/yoda?sentence=#{message}", 
  	  headers: { 
  	    "X-Mashape-Authorization" => ENV['YODA_SPEAK']
  	  }

  	return response.body
  end



end
