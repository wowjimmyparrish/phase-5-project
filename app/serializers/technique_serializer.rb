class TechniqueSerializer < ActiveModel::Serializer
  attributes :id, :name, :video, :position_id, :user_id
  has_many :comments
  belongs_to :user
  has_one :position
end
