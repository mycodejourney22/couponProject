class Api::V1::CouponsController < ApplicationController
  protect_from_forgery with: :null_session


  def create
    @coupon = Coupon.new(coupon_params)
    if @coupon.save
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
      render json: { error: "Failed to update coupon" }, status: :unprocessable_entity
    end
  end

  private

  def coupon_params
    params.require(:coupon).permit(:discount_code, :description, :valid_from, :valid_until, :coupon_type, :redemption_limit,
                                  :percentage, :isUsed)
  end
end
