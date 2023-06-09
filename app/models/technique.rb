class Technique < ApplicationRecord
    has_many :comments, dependent: :destroy 
    has_many :users, through: :comments
    belongs_to :user
    belongs_to :position

    validates :name, presence: true 
    validates :video, presence: true
    validates :position_id, presence: true
    
    
end
