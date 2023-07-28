class NotifierMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.notifier_mailer.coupon_notifier.subject
  #
  def coupon_notifier
    @greeting = "Hi"
    @Coupon = Coupon.last

    mail to: Coupon.last.email, subject: "DISCOUNT CARD FOR YOUR NEXT PHOTOSHOOT"
  end
end
