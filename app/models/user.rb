class User < ApplicationRecord
    has_many :comments
    has_many :techniques, through: :comments
    has_many :created_techniques, class_name: "Technique"
    has_secure_password 
    
    validates :username, presence: true, uniqueness: true, length: { in: 5..20 }
    validates :password, presence: true, length: { in: 6..20 }, confirmation: :true
    
end
