class AddAttachmentImgToWorks < ActiveRecord::Migration
  def self.up
    change_table :works do |t|
      t.attachment :img
    end
  end

  def self.down
    remove_attachment :works, :img
  end
end
