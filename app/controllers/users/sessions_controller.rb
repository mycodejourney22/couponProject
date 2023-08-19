# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token
  include RackSessionsFix
  respond_to :json

  def create
    user = warden.authenticate(auth_options)
    if user
      sign_in(user)
      payload = { user_id: user.id }
      token = JWT.encode(payload, Rails.application.secrets.secret_key_base)
      # if Rails.env.production?
      #   secret_key = ENV['devise_jwt_secret_key']
      # else
      #   secret_key = Rails.application.secrets.secret_key_base
      # end
      # token = JWT.encode(payload, secret_key)
      render json: { message: "Logged in successfully." , token: token}, status: :ok
    else
      render json: { error: 'Invalid email or password.' }, status: :unauthorized
    end
  end


end
