class AddColumnToCoupon < ActiveRecord::Migration[7.0]
  def change
    add_column :coupons, :email, :string
    add_column :coupons, :first_name, :string
  end
end
