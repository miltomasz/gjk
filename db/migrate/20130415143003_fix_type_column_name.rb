class FixTypeColumnName < ActiveRecord::Migration
  def change
    rename_column :events, :type, :transport_type
  end
end
