class Api::V1::CouponsController < ApplicationController

  def create
    @coupon = Coupon.new(coupon_params)
    if @coupon.save
      render json: @coupon
    else
      render json: @coupon.errors
    end
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
      render json: { message: "Coupon not found with discount code '#{discount_code}'." }
    end
  end

  private

  def coupon_params
    params.require(:coupon).permit(:discount_code, :description, :valid_from, :valid_until, :coupon_type, :redemption_limit,
                                  :percentage)
  end
end
