class Message < ActiveRecord::Base
  # Remember to create a migration!
  belongs_to :contact
end
