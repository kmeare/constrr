Rails.application.routes.draw do
  resources :workers
  resources :works
  post 'user_token' => 'user_token#create'
  get 'user/me' => 'users#me'
  resources :comments
  resources :posts
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
