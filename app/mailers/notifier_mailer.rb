class NotifierMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.notifier_mailer.coupon_notifier.subject
  #
  def coupon_notifier
    @greeting = "Hi"
    @Coupon = Coupon.last

    mail to: Coupon.last.email, subject: "Hi #{Coupon.last.first_name}, Discount card for your next Photoshoot with us 💖💖"
  end
end
