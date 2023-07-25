import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

export default function CouponForm() {
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    discount_code: couponCode,
    description: "",
    redemption_limit: "",
    coupon_type: "",
    percentage: "",
    valid_from: "",
    valid_until: ""

  })


  useEffect(() => {
    axios.get('/api/v1/generate_coupon_code')
      .then((response) => {
        setCouponCode(response.data.coupon_code);
      })
      .catch((error) => {
        console.error('Error fetching coupon code:', error);
      });
  }, [])

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  console.log(couponCode)

  const today = new Date().toISOString().split('T')[0];

  const oneYearLater = new Date();
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
  const maxDate = oneYearLater.toISOString().split('T')[0];


  function handleSubmit(event) {
    event.preventDefault()
    const submitData = new FormData()
    submitData.append('coupon[discount_code]', couponCode)
    submitData.append('coupon[description]', formData.description)
    submitData.append('coupon[redemption_limit]', formData.redemption_limit)
    submitData.append('coupon[coupon_type]', formData.coupon_type)
    submitData.append('coupon[percentage]', formData.percentage)
    submitData.append('coupon[valid_from]', formData.valid_from)
    submitData.append('coupon[valid_until]', formData.valid_until)
    submitToApi(submitData)
    navigate('/')
  }

  function submitToApi(formData) {
    axios.post('/api/v1/coupons', formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err))
  }



  if (!couponCode) {
    return <div>Loading...</div>
  }



  return (
    <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
      <div className="jumbotron jumbotron-fluid bg-transparent w-100">
        <div className="container secondary-color">
          <h1 className="display-4 mb-5">Coupon Form</h1>
          <Link to='/' className='fs-2 text-dark'>Back</Link>
          <div className='form-card mt-3'>
            <form onSubmit={handleSubmit} >
              <label for="discount_code" className="form-label fw-semibold">Discount Code</label>
              <input
                className="form-control"
                type="text"
                placeholder="Discount Code"
                name="discount_code"
                value={couponCode}
              /><br></br>
              <label for="description" className="form-label fw-semibold">Description</label>
              <input
                type="text"
                placeholder="description"
                onChange={handleChange}
                name="description"
                value={formData.description}
                className='form-control'
              /><br></br>
              <label for="valid_from" className="form-label fw-semibold">Valid from</label>
              <input
                type="date"
                placeholder="Valid from"
                onChange={handleChange}
                name="valid_from"
                value={formData.valid_from}
                min={today}
                className='form-control'
              /><br></br>
              <label for="valid_until" className="form-label fw-semibold">Expiry Date</label>
              <input
                type="date"
                placeholder="Expiry Date"
                onChange={handleChange}
                name="valid_until"
                value={formData.valid_until}
                min={today}
                max={maxDate}
                className='form-control'
              /><br></br>
              <label for="coupon_type" className="form-label fw-semibold">Coupon Type</label>
              <input
                type="text"
                placeholder="coupon_type"
                onChange={handleChange}
                name="coupon_type"
                value={formData.coupon_type}
                className='form-control'
              /><br></br>
              <label for="percentage" className="form-label fw-semibold">Percentage discounted</label>
              <input
                type="text"
                placeholder="percentage"
                onChange={handleChange}
                name="percentage"
                value={formData.percentage}
                className='form-control'
              /><br></br>
              <label for="redemption_limit" className="form-label fw-semibold">Limit</label>
              <input
                type="text"
                placeholder="Limit"
                onChange={handleChange}
                name="redemption_limit"
                value={formData.redemption_limit}
                className='form-control'
              /><br></br>
              <button className="btn btn-lg custom-button w-100"
                role="button">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
