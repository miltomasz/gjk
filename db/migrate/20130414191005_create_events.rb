class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :type
      t.float :lat
      t.float :lng

      t.timestamps
    end
  end
end
