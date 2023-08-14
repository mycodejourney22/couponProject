class Api::V1::RegistrationsController < ApplicationController
  protect_from_forgery with: :null_session


  def create
    user = User.new(user_params)

    if user.save
      render json: { message: "User created successfully", user: user }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name)
  end
end
