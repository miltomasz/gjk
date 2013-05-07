class AddLineNumberToEvents < ActiveRecord::Migration
  def change
    add_column :events, :line_number, :string
  end
end
