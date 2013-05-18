class Note < ActiveRecord::Base
  attr_accessible :content, :name

  validates :content,  presence: true, length: { maximum: 320 }
end
