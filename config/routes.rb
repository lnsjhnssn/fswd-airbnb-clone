Rails.application.routes.draw do
 

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show, :create, :update]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/authenticated' => 'sessions#authenticated'
     
    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'
  end

  get '/property/:id' => 'static_pages#property'
  get '/login' => 'static_pages#login'
  get 'booking/:id/success' => 'static_pages#success'
  get '/add-property' => 'static_pages#addProperty'
  get '/edit-property/:id' => 'static_pages#editProperty'

  root to: 'static_pages#home'

end