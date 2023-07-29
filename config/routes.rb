Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :coupons, only: [:create, :index, :update]
      get 'coupons/search', to: 'coupons#search', as: 'search_coupons'
      get '/generate_coupon_code', to: 'coupons#generate_coupon_code'
    end
  end
  get '*path', to: 'pages#index', via: :all
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "pages#index"
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

end
