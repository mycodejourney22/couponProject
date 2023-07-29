class PagesController < ApplicationController
  def index
    @Coupon = Coupon.last
  end
end
