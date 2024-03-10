import React, { Component } from 'react';
import ProductForm from './ProductFrom';

export default class ReactForm extends Component {
  state = {
    arrProduct: [
      {
        id: 1,
        sdt: '01234569874',
        nameSV: 'bảo an',
        email: 'vonguyenbaoan050203@gmail.com',
      },
      {
        id: 2,
        sdt: 'Iphone',
        nameSV: 'bao ân',
        email: 'vonguyenbaoan050203@gmail.com',
      },
    ],
    productEdit: {
      // id: 2,
      // sdt: 'Iphone',
      // nameSV: 'bao ân',
      // email: 'vonguyenbaoan050203@gmail.com',
    },
  };
  handleAddProduct = (proClick) => {
    let arrUpdate = [...this.state.arrProduct];
    arrUpdate.push(proClick);
    this.setState({
      arrProduct: arrUpdate,
    });
  };
  handleDeleteProduct = (idProduct) => {
    let newArrPro = this.state.arrProduct.filter(
      (item) => item.id != idProduct,
    );
    this.setState({
      arrProduct: newArrPro,
    });
  };
  handleEditProduct = (proClick) => {
    this.setState({
      productEdit: proClick,
    });
  };
  handleUpdateProduct = (productUpdate) => {
    console.log('productUpdate: ', productUpdate);

    let index = this.state.arrProduct.findIndex(
      (item) => item.id == productUpdate.id,
    );

    this.state.arrProduct[index] = productUpdate;

    this.setState({
      arrProduct: this.state.arrProduct,
    });
  };
  render() {
    return (
      <div>
        <h3>Bài tập react form</h3>

        <ProductForm
          handleUpdateProduct={this.handleUpdateProduct}
          productEdit={this.state.productEdit}
          handleAddProduct={this.handleAddProduct}
        />

        <table className="table container mt-4">
          <thead>
            <tr className="table-dark">
              <th>id</th>
              <th>name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.arrProduct.map((phone) => {
              return (
                <tr key={phone.id}>
                  <td>{phone.id}</td>
                  <td>{phone.nameSV}</td>
                  <td>
                  {phone.sdt}
                  </td>
                  <td>{phone.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        this.handleEditProduct(phone);
                      }}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        this.handleDeleteProduct(phone.id);
                      }}
                      className="btn btn-success"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
