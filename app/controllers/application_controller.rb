class ApplicationController < ActionController::Base


  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name])
  end
end
