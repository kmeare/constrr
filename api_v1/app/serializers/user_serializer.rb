class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name ,:last_name ,:email, :auth_token, :avatar, :created_at, :updated_at
  has_many :posts
end
