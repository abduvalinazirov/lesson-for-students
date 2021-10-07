import React, { Component, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function Navbar(props) {
  const [selectedProducts, setSelectedProducts] = useState([])

  useEffect(() => {
    setSelectedProducts(JSON.parse(localStorage.getItem("store")))
  }, [])

  useEffect(() => {
    setSelectedProducts(JSON.parse(localStorage.getItem("store")))
  }, [localStorage.getItem("store")])

  return (
    <div>
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
          <Link className="navbar-brand" to="/">LOGO</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="section">Section</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="products" >Products</Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <UncontrolledDropdown>
                <DropdownToggle caret>
                  Store
                  <span className="badge badge-success ml-2">{props.totalCount}</span>
                </DropdownToggle>
                <DropdownMenu>{selectedProducts && selectedProducts.length ? (<div>
                  {selectedProducts.map((item, index) => (
                    <DropdownItem header>{item.name} - {item.totalCount}x </DropdownItem>
                  ))}
                  <DropdownItem divider />
                  <DropdownItem><Link to="store">Total price: {props.totalPrice}$</Link></DropdownItem>
                </div>) : <h4 className="m-0 text-center">No product</h4>
                }
                </DropdownMenu>
              </UncontrolledDropdown>
              <h2 className="text-light">Muhammad</h2>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
