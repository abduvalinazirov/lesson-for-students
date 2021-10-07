import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Navbar from './Navbar'

export default class HomePage extends Component {
  state = {
    isOpen: false
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
      <div>
        <h1 className="animate__rubberBand animate__animated">HomePage</h1>
        <div>
          <Button color="danger" onClick={() => this.toggle()}>Button</Button>
          <Modal isOpen={this.state.isOpen} toggle={() => this.toggle()} >
            <ModalHeader toggle={() => this.toggle()}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.toggle()}>Do Something</Button>{' '}
              <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}
