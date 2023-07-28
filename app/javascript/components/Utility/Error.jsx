export const validateform = (errors, setErrors, formData) => {
  const { first_name, last_name, email, phone_number, discount_code, description, valid_from, valid_until, coupon_type, percentage } = formData;


  if (!first_name) {
    errors = { ...errors, first_name: 'First Name is required' }
  }

  if (!last_name) {
    errors = { ...errors, last_name: 'Last Name is required' }
  }

  if (!email) {
    errors = { ...errors, email: 'Email address is required' }
  }

  if (!phone_number) {
    errors = { ...errors, phone_number: 'Phone number is required' }
  }

  if (!description) {
    errors = { ...errors, description: 'Description is required' }
  }

  if (!valid_from) {
    errors = { ...errors, valid_from: 'Valid From date  is required' }
  }

  if (!valid_until) {
    errors = { ...errors, valid_until: 'Expiry date   is required' }
  }

  if (!coupon_type) {
    errors = { ...errors, coupon_type: 'Coupon Type  is required' }
  }

  if (!percentage) {
    errors = { ...errors, percentage: 'Percentage  is required' }
  }

  setErrors(errors)
  return Object.keys(errors).length === 0;

}
