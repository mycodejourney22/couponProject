# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  protect_from_forgery with: :null_session
  include RackSessionsFix
  respond_to :json

  def create
    build_resource(sign_up_params)
    if resource.save
      render json: {
        message: 'User registered successfully.',
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes] },
        status: :created
    else
      render json: { error: resource.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  private
  def respond_with(current_user, _opts = {})
    if resource.persisted?
      render json: {
        status: {code: 200, message: 'Signed up successfully.'},
        data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
      }
    else
      render json: {
        status: {message: "User couldn't be created successfully. #{current_user.errors.full_messages.to_sentence}"}
      }, status: :unprocessable_entity
    end
  end

  def sign_up_params
    params.require(:user).permit(:email, :password,  :first_name, :last_name)
  end

end
