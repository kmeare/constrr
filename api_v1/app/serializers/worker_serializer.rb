class WorkerSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :imss, :absense
  has_one :work
end
