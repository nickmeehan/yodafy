class CreateContacts < ActiveRecord::Migration
  def change
  	create_table :contacts do |t|
  		t.string :phone_number
  		t.string :name
  		t.belongs_to :user
  		t.timestamps
  	end
  end
end
