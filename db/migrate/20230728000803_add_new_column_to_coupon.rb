class AddNewColumnToCoupon < ActiveRecord::Migration[7.0]
  def change
    add_column :coupons, :phone_number, :string
    add_column :coupons, :last_name, :string
  end
end
