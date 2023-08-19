class Api::V1::CouponsController < ApplicationController
  before_action :authenticate_request
  protect_from_forgery with: :null_session


  def create
    @coupon = Coupon.new(coupon_params)
    user_id = params[:user_id].to_i
    @coupon.user_id = user_id
    if @coupon.save
      NotifierMailer.coupon_notifier.deliver_later
      render json: @coupon
    else
      render json: @coupon.errors
    end
  end

  def generate_coupon_code
    coupon_code = CouponCode.generate
    render json: { coupon_code: coupon_code }
  end

  def index
    @coupons = Coupon.all
    render json: @coupons
  end

  def search
    discount_code = params[:discount_code]
    @coupon = Coupon.find_by(discount_code: discount_code)

    if @coupon
      render json: @coupon
    else
      render json: { message: "Coupon not found with discount code '#{discount_code}'."}, status: :not_found
    end
  end

  def update
    @coupon = Coupon.find(params[:id])

    if @coupon.update(coupon_params)
      render json: @coupon
    else
      render json: { error: 'Failed to update coupon' }, status: :unprocessable_entity
    end
  end

  private

  def coupon_params
    params.require(:coupon).permit(:discount_code, :description, :valid_from, :valid_until, :coupon_type, :redemption_limit,
                                   :percentage, :isUsed, :email, :first_name, :last_name, :phone_number, :user_id)
  end

  def authenticate_request
    header = request.headers['Authorization']
    token = header.split(' ').last if header

    begin
      if Rails.env.production?
        decoded_token = JWT.decode(token, ENV['devise_jwt_secret_key'], true, algorithm: 'HS256')
      else
        decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
      end
      # decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
      payload = decoded_token.first

      payload['user_id'] # Extract user_id from payload

      # Now you can use user_id to identify the user and perform further authorization checks
    rescue JWT::DecodeError => e
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end
