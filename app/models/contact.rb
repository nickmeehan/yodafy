class Contact < ActiveRecord::Base
  # Remember to create a migration!
  belongs_to :user
  has_many :messages

  validates :name, :phone_number, presence: true
end
