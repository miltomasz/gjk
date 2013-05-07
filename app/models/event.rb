class Event < ActiveRecord::Base
  attr_accessible :lat, :lng, :transport_type, :line_number
  acts_as_mappable :default_units => :kms
end
