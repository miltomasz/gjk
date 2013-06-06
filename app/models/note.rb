class Note < ActiveRecord::Base
  attr_accessible :content, :name

  validates :content,  presence: true, length: { maximum: 320 }

  default_scope order: 'notes.created_at DESC'
end
