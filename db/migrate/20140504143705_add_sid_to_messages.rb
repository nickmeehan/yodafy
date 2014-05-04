class AddSidToMessages < ActiveRecord::Migration
  def up
  	add_column :messages, :message_sid, :string
  end

  def down
  	remove_column :messages, :message_sid
  end
end
