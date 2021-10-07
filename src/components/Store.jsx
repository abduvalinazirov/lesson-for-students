import { Button, Modal, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react'

export default function Store(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customProductId, setCustomProductId] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([])

  useEffect(() => {
    setSelectedProducts(JSON.parse(localStorage.getItem("store")))
  }, [])

  useEffect(() => {
    setSelectedProducts(JSON.parse(localStorage.getItem("store")))
  }, [localStorage.getItem("store")])

  const showModal = () => {
    setIsModalVisible(true);
  };


  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    handleCancel()
    props.buyProduct(values, customProductId)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container mt-3">
      {selectedProducts.length ? (
        <div>
          {console.log(selectedProducts)}
          <div className="d-flex align-items-center justify-content-between">
            <h3>My cart</h3>
            <div className="d-flex align-items-center">
              <h4 className="m-0">All products price: <span className="badge badge-warning">{props.totalPrice}$</span></h4>
            </div>
          </div>
          <div className="row mt-2">
            {selectedProducts.map((item, index) => (
              <div key={index} className="col-sm-6 mb-2">
                <div className="row">
                  <div className="col-6">
                    <img className="w-100" src={item.imgUrl} alt="" />
                  </div>
                  <div className="col-6">
                    <h5>{item.name}, {item.brand}</h5>
                    <h5>Price: {item.price}$</h5>
                    <h5>Total count: {item.totalCount}</h5>
                    <h5>Total price: {item.totalCount * item.price}$</h5>
                    <div className="btn-group">
                      <button className="btn btn-secondary px-4">-</button>
                      <button className="btn btn-light px-4">{item.totalCount}</button>
                      <button className="btn btn-secondary px-4">+</button>
                    </div>
                    <div className="d-flex align-items-center mt-2">
                      <Button type="primary" danger onClick={() => props.deleteSelectedProduct(item.id)} className=" mr-2">Delete product</Button>
                      <Button type="primary" onClick={() => showModal(setCustomProductId(item.id))} >Buy Now</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : <><h2 className="text-center">No products</h2></>}

      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[{ required: true, message: 'Please input your Card Number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Card Date"
            name="cardDate"
            rules={[{ required: true, message: 'Please input your Card Date!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Card Password"
            name="cardPassword"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Buy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
