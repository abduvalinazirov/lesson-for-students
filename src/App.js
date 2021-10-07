import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import FunctionalComponent from "./components/FunctionalComponent";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Section from "./components/Section";


import React, { Component } from 'react'
import Store from "./components/Store";

export default class App extends Component {
  state = {
    products: [
      { id: 1, name: "iphone 9", brand: "iPhone", price: 999, imgUrl: "images/iphone 9.jpg" },
      { id: 2, name: "iphone 10", brand: "iPhone", price: 800, imgUrl: "images/iphone 10.jpg" },
      { id: 3, name: "iphone 11", brand: "iPhone", price: 900, imgUrl: "images/iphone 11.jpg" },
      { id: 4, name: "iphone 13", brand: "iPhone", price: 1200, imgUrl: "images/iphone13.jpg" },
      { id: 5, name: "redmi 8", brand: "Xiaomi", price: 400, imgUrl: "images/redmi 8.jpg" },
      { id: 6, name: "redmi note 8", brand: "Xiaomi", price: 500, imgUrl: "images/redmi note 8.jpg" },
      { id: 7, name: "redmi p9", brand: "Xiaomi", price: 350, imgUrl: "images/redmi p9.jpg" },
      { id: 8, name: "redmi poco x3", brand: "Xiaomi", price: 320, imgUrl: "images/redmi poco x3.jpg" },
      { id: 9, name: "Samsung A73", brand: "Samsung", price: 290, imgUrl: "images/samsung a73.jpg" },
      { id: 10, name: "Samsung A74", brand: "Samsung", price: 310, imgUrl: "images/samsung a74.jpg" },
      { id: 11, name: "Samsung J2", brand: "Samsung", price: 250, imgUrl: "images/samsung j2.jpg" },
      { id: 12, name: "Samsung J3", brand: "Samsung", price: 260, imgUrl: "images/samsung j3.jpg" },
    ],
    person: {
      cardNumber: "00001111",
      cardPassword: 9999,
      name: "Jack",
      cardDate: "1223",
      balance: 2000
    },
    tempCount: 1,
    selectedProducts: [],
    totalCount: 0,
    totalPrice: 0
  }
  changeCount = (status) => {
    if (status === "plus") {
      this.setState({
        tempCount: this.state.tempCount + 1
      })
    } else if (status === "minus" && this.state.tempCount > 1) {
      this.setState({
        tempCount: this.state.tempCount - 1
      })
    }
  }
  addToStore = (index) => {
    let products = this.state.products
    let selectedProducts = this.state.selectedProducts
    let product = products[index]
    let counter = 0
    let prices = 0
    if (selectedProducts.find(item => item.id === products[index].id)) {
      let ind = selectedProducts.findIndex(item => item.id === products[index].id)
      selectedProducts[ind].totalCount += this.state.tempCount
    } else {
      product.totalCount = this.state.tempCount
      selectedProducts.push(product)
    }
    for (let i = 0; i < selectedProducts.length; i++) {
      counter += selectedProducts[i].totalCount
      prices += selectedProducts[i].totalCount * selectedProducts[i].price
    }
    localStorage.setItem("store", JSON.stringify(selectedProducts))
    this.setState({
      selectedProducts: selectedProducts,
      tempCount: 1,
      totalCount: counter,
      totalPrice: prices
    })
  }
  deleteSelectedProduct = (id) => {
    console.log(JSON.parse(localStorage.getItem("store")));
    let selectedProducts = this.state.selectedProducts.filter(item => item.id !== id)
    localStorage.setItem("store", JSON.stringify(selectedProducts))
    this.setState({
      selectedProducts
    })
  }

  buyProduct = (values, id) => {
    const { person, selectedProducts } = this.state
    let product = selectedProducts.find(item => item.id === id)
    if (person.balance >= product.totalCount * product.price && person.cardDate == values.cardDate && person.cardNumber == values.cardNumber && person.cardPassword == values.cardPassword) {
      let newPerson = person
      person.balance = person.balance - product.totalCount * product.price
      this.setState({
        person: newPerson,
      })
      this.deleteSelectedProduct(id)
      toast.success("Xarid muvafaqiyatli amalga oshirildi :)")
    } else {
      toast.error("Xarid amalga oshirilmadi :(")
    }
  }

  render() {
    return (
      <div>
        {console.log(this.state.person)}
        <ToastContainer />
        <Router>
          <Navbar totalPrice={this.state.totalPrice} selectedProducts={this.state.selectedProducts} totalCount={this.state.totalCount} />
          <div>
            <Switch>
              <Route path="/section" component={Section} />
              <Route path="/store">
                <Store buyProduct={(values, id) => this.buyProduct(values, id)} deleteSelectedProduct={(id) => this.deleteSelectedProduct(id)} totalPrice={this.state.totalPrice} selectedProducts={this.state.selectedProducts} />
              </Route>
              <Route path="/products">
                <Products addToStore={(index) => this.addToStore(index)} changeCount={(status) => this.changeCount(status)} tempCount={this.state.tempCount} getIndex={(index) => this.getIndex(index)} products={this.state.products} />
              </Route>
              <Route exact path="/">
                {/* <HomePage /> */}
                <FunctionalComponent />
              </Route>
            </Switch>
          </div>
          <Footer id="11" />
        </Router>
      </div>
    )
  }
}
