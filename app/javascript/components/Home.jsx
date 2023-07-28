import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default () => {
  const [formData, setFormData] = useState({
    params: ""
  })

  const [searchResult, setSearchResult] = useState(null)
  const [status, setStatus] = useState(null)



  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  function handleSearch() {
    axios.get(`/api/v1/coupons/search?discount_code=${formData.params}`)
      .then((res) => {
        console.log('Status Code:', res.data);
        return setSearchResult(res.data)
      })
      .catch((err) => {
        console.log(err.response.status)
        setStatus(err.response.status)
        console.error(err)
      })
  }

  function handleClick() {
    const updatedSearchResult = { ...searchResult, isUsed: true };
    setSearchResult(updatedSearchResult);
    axios
      .patch(`/api/v1/coupons/${searchResult.id}`, { coupon: updatedSearchResult })
      .then((response) => {
        // Assuming your Rails API returns the updated coupon in the response, you can update the state with it
        setSearchResult(response.data);
      })
      .catch((error) => {
        console.error('Failed to update coupon:', error);
      });
  }



  function handleSubmit(event) {
    event.preventDefault();
    handleSearch();
  }




  if (searchResult) {
    const confirmActive = searchResult.isUsed ? 'disabled' : '';
    const buttonClass = `btn btn-lg custom-button w-100 ${confirmActive}`
    return (
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent w-100">
          <div className="container secondary-color">
            {searchResult.isUsed && <p className="danger-p text-center">This coupon is expired or already used</p>}
            <h2>Coupon Details:</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Discount Code</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Active</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{searchResult.discount_code}</td>
                  <td>{searchResult.first_name}</td>
                  <td>{!searchResult.isUsed ? "Valid" : "Expired"}</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th scope="col">Coupon Type</th>
                  <th scope="col">Percentage</th>
                  <th scope="col">Limit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{searchResult.coupon_type}</td>
                  <td >{searchResult.percentage}</td>
                  <td >{searchResult.redemption_limit}</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th scope="col">Start Date</th>
                  <th scope="col">Expiry Date</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{searchResult.valid_from}</td>
                  <td >{searchResult.valid_until}</td>
                  <td>{searchResult.description}</td>
                </tr>
              </tbody>
            </table>
            <button className={buttonClass}
              onClick={handleClick}
              role="button">{searchResult.isUsed ? "APPLIED OR EXPIRED" : "APPLY"}</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent w-100">
          <div className="container secondary-color">
            <h1 className="display-4">Welcome to E-Coupons</h1>

            <hr className="my-4" />
            <div className="mt-3">
              {status && <p className="danger-p">The discount code you enter is invalid</p>}
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter a discount code"
                  name="params"
                  onChange={handleChange}
                  value={formData.params}
                  className='form-control'
                />
                <button className="btn btn-lg custom-button w-100 mt-3"
                  role="button"
                >Apply Customer Cuppon</button>
              </form>
            </div>
            <h2 className="my-3 text-center">OR</h2>
            <Link
              to="/new"
              className="btn btn-lg custom-button w-100"
              role="button"
            >
              Register a New Coupon
            </Link>
          </div>
        </div>
      </div>)
  }
};
