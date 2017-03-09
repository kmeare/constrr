class WorkSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :lat, :lon, :description, :img
  has_many :workers
end
