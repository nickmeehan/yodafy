class CreateMessages < ActiveRecord::Migration
  def change
  	create_table :messages do |t|
  		t.text :content
  		t.belongs_to :contact
  		t.timestamps
  	end
  end
end
