import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import { validateform } from '../Utility/Error';
import axios from 'axios'
import Login from '../Utility/Login'

export default function CouponForm() {
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate()
  const [errors, setErrors] = React.useState({})
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const isAuthenticated = !!token
  const [user, setUser] = useState("")

  const location = useLocation()




  useEffect(() => {
    if (location.state) {
      setUser(location.state.userId)
    }
  }, [])


  const [formData, setFormData] = useState({
    discount_code: couponCode,
    description: "",
    coupon_type: "",
    percentage: "",
    valid_from: "",
    valid_until: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: ""
  })

  // console.log(userId)



  useEffect(() => {
    axios.get('/api/v1/generate_coupon_code', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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


  // console.log(userId)


  const today = new Date().toISOString().split('T')[0];

  const oneYearLater = new Date();
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
  const maxDate = oneYearLater.toISOString().split('T')[0];


  function handleSubmit(event) {
    event.preventDefault()
    console.log("I am user" + user)
    console.log(formData)
    if (validateform(setErrors, formData)) {
      const submitData = new FormData()
      submitData.append('coupon[discount_code]', couponCode)
      submitData.append('coupon[description]', formData.description)
      // submitData.append('coupon[redemption_limit]', formData.redemption_limit)
      submitData.append('coupon[coupon_type]', formData.coupon_type)
      submitData.append('coupon[percentage]', formData.percentage)
      submitData.append('coupon[valid_from]', formData.valid_from)
      submitData.append('coupon[valid_until]', formData.valid_until)
      submitData.append('coupon[email]', formData.email)
      submitData.append('coupon[first_name]', formData.first_name)
      submitData.append('coupon[last_name]', formData.last_name)
      submitData.append('coupon[phone_number]', formData.phone_number)
      submitToApi(submitData)
      navigate('/')
    }
    else {
      console.log(errors)
    }
  }

  function submitToApi(formData) {
    axios.post('/api/v1/coupons', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        user_id: '4'
      }
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }


  if (!isAuthenticated) {
    return (
      <Login
        isAuthenticated={isAuthenticated}
        setToken={setToken}
      />
    )
  }



  else if (!couponCode) {
    return <div>Loading...</div>
  }



  else {
    return (
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent w-100">
          <div className="container secondary-color">
            <h1 className="display-4 mb-5">Coupon Form</h1>
            <Link to='/' className='fs-2 text-dark'>Back</Link>
            <div className='form-card mt-3'>
              <form onSubmit={handleSubmit} >
                <div className="row">
                  <div className="col">
                    <label htmlFor="description" className="form-label fw-semibold">First Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      onChange={handleChange}
                      name="first_name"
                      value={formData.first_name}
                      className='form-control'
                    />
                    {errors.first_name && <span className='text-danger'>{errors.first_name}</span>}
                  </div>
                  <div className="col">
                    <label htmlFor="description" className="form-label fw-semibold">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      onChange={handleChange}
                      name="last_name"
                      value={formData.last_name}
                      className='form-control'
                    />
                    {errors.last_name && <span className='text-danger'>{errors.last_name}</span>}
                  </div></div><br></br>
                <div className="row">
                  <div className="col">
                    <label htmlFor="description" className="form-label fw-semibold">Email address</label>
                    <input
                      type="email"
                      placeholder="Email address"
                      onChange={handleChange}
                      name="email"
                      value={formData.email}
                      className='form-control'
                    />
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                  </div>
                  <div className="col">
                    <label htmlFor="description" className="form-label fw-semibold">Phone number</label>
                    <input
                      type="text"
                      placeholder="Phone number"
                      onChange={handleChange}
                      name="phone_number"
                      value={formData.phone_number}
                      className='form-control'
                    />
                    {errors.phone_number && <span className='text-danger'>{errors.phone_number}</span>}
                  </div>
                </div><br></br>
                <div className="row">
                  <div className="col">
                    <label htmlFor="discount_code" className="form-label fw-semibold">Discount Code</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Discount Code"
                      name="discount_code"
                      value={couponCode}
                    />
                    {errors.discount_code && <span className='text-danger'>{errors.discount_code}</span>}
                  </div>
                  <div className="col">
                    <label htmlFor="description" className="form-label fw-semibold">Description</label>
                    <select
                      type="text"
                      placeholder="description"
                      onChange={handleChange}
                      name="description"
                      value={formData.description}
                      className='form-control'
                    >
                      <option value=""></option>
                      <option value="Family PhotoShoot">Family PhotoShoot</option>
                      <option value="Kiddies PhotoShoot">Kiddies PhotoShoot</option>
                      <option value="Maternity Shoot">Maternity Shoot</option>
                      <option value="Personal Shoot">Personal Shoot</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.description && <span className='text-danger'>{errors.description}</span>}
                  </div></div><br></br>
                <div className='row'>
                  <div className='col'>
                    <label htmlFor="valid_from" className="form-label fw-semibold">Valid from</label>
                    <input
                      type="date"
                      placeholder="Valid from"
                      onChange={handleChange}
                      name="valid_from"
                      value={formData.valid_from}
                      min={today}
                      className='form-control'
                    />
                    {errors.valid_from && <span className='text-danger'>{errors.valid_from}</span>}
                  </div>
                  <div className='col'>
                    <label htmlFor="valid_until" className="form-label fw-semibold">Expiry Date</label>
                    <input
                      type="date"
                      placeholder="Expiry Date"
                      onChange={handleChange}
                      name="valid_until"
                      value={formData.valid_until}
                      min={today}
                      max={maxDate}
                      className='form-control'
                    />
                    {errors.valid_until && <span className='text-danger'>{errors.valid_until}</span>}
                  </div></div>
                <br></br>
                <div className='row'>
                  <div className='col'>
                    <label htmlFor="coupon_type" className="form-label fw-semibold">Coupon Type</label>
                    <br />
                    <select
                      className='form-control'
                      id="coupon_type"
                      value={formData.coupon_type}
                      onChange={handleChange}
                      name="coupon_type"
                    >
                      <option value=""></option>
                      <option value="New Customer Discount">New Customer Discount</option>
                      <option value="Return Customer Discount">Return Customer Discount</option>
                      <option value="Christmas Shoot Special">Christmas Shoot Special</option>
                      <option value="Wednesday Special">Wednesday Special</option>
                    </select>
                    {errors.coupon_type && <span className='text-danger'>{errors.coupon_type}</span>}
                  </div>
                  <div className="col">
                    <label htmlFor="percentage" className="form-label fw-semibold">Percentage discounted</label>
                    <br />
                    <select
                      className='form-control'
                      placeholder="percentage"
                      value={formData.percentage}
                      onChange={handleChange}
                      name="percentage"
                    >
                      <option value=""></option>
                      <option value="10 percent">10 percent</option>
                      <option value="20 percent">20 percent</option>
                    </select>
                    {errors.percentage && <span className='text-danger'>{errors.percentage}</span>}
                  </div>
                </div><br></br>

                <button className="btn btn-lg custom-button w-100"
                  role="button">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
