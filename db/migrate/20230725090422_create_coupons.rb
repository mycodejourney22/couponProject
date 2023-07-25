class CreateCoupons < ActiveRecord::Migration[7.0]
  def change
    create_table :coupons do |t|
      t.string :discount_code
      t.string :description
      t.string :redemption_limit
      t.string :coupon_type
      t.string :percentage
      t.date :valid_from
      t.date :valid_until
      t.boolean :isUsed, default: false

      t.timestamps
    end
  end
end
