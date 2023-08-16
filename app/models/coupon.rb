class Coupon < ApplicationRecord
  validates :discount_code, presence: true
  validates :description, presence: true
  # validates :redemption_limit, presence: true
  validates :percentage, presence: true
  validates :valid_from, presence: true
  validates :valid_until, presence: true
  validates :email, presence: true
  validates :first_name, presence: true
  belongs_to :user

end
