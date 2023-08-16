class AddUserReferenceToCoupon < ActiveRecord::Migration[7.0]
  def change
    add_reference :coupons, :user, null: false, foreign_key: true
  end
end
