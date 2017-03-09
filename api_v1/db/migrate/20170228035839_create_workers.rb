class CreateWorkers < ActiveRecord::Migration[5.0]
  def change
    create_table :workers do |t|
      t.string :first_name
      t.string :last_name
      t.references :work, foreign_key: true
      t.string :imss
      t.string :absense

      t.timestamps
    end
  end
end
