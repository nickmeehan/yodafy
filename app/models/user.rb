class User < ActiveRecord::Base
  # Remember to create a migration!
  has_many :contacts
  has_many :messages
end
