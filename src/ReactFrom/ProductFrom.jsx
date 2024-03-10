import React, { Component } from 'react';

export default class ProductForm extends Component {
  state = {
    value: {
      id: '',
      sdt: '',
      namesv: '',
      email: '',
    },
    errValue: {
      id: '',
      sdt: '',
      name: '',
      email: '',
    },
    isSubmit: false,
  };
  handleChangeInput = (e) => {
    // e.target đại diện cho thẻ input

    let tag = e.target;
    let dataType = e.target.getAttribute('data-type');
    let nameInput = tag.name;
    // clone value hiện tại
    let newValue = { ...this.state.value };
    // sửa tại value của key đó
    newValue[nameInput] = tag.value;

    // xử lý err
    let newErrValue = { ...this.state.errValue };
    let message = '';

    if (newValue[nameInput] === '') {
      message = `${nameInput} cannot be blank !`;
    } else {
      if (dataType) {
        switch (dataType) {
          case 'number':
            {
              let regex = /^(?:[1-9]\d{0,2}|1000)$/;
              if (!regex.test(newValue[nameInput])) {
                message = '* Trường này chỉ nhận số';
              }
            }
            break;
          case 'string':
            {
              let regex = /^\d{10}$/;
              if (!regex.test(newValue[nameInput])) {
                message = '* trường này chỉ nhận SDT';
              }
            }
            break;
          default: {
          }
        }
      }
    }
    newErrValue[nameInput] = message;

    // Xử lý nút submit
    // Khi tất cả các giá trị err mà chỉ cần 1 trường có lỗi =>> lỗi
    // chỉ 1 trường value mà "" => lỗi
    let valid = true;
    for (let key in newErrValue) {
      if (newErrValue[key] !== '') {
        valid = false;
        break;
      }
    }

    for (let key in newValue) {
      if (newValue[key] === '') {
        valid = false;
        break;
      }
    }

    this.setState({
      value: newValue,
      errValue: newErrValue,
      isSubmit: valid,
    });
  };
  handleSubmit = (e) => {
    // Sự kiện chặn load trang
    e.preventDefault();
    let { handleAddProduct } = this.props;
    handleAddProduct(this.state.value);
  };
  static getDerivedStateFromProps(newProps, currentState) {
    console.log('currentState: ', currentState);
    console.log('newProps: ', newProps);
    // Can thiệp trước khi render , lấy props product edit gán vào state
    // Trả ra state mới để hàm lấy dữ liệu
    if (newProps.productEdit.id !== currentState.value.id) {
      // Hành động khi user click nút edit
      currentState.value = { ...newProps.productEdit };
    }
    return currentState;
  }
  render() {
    let { id, sdt, nameSV, email } = this.state.value;
    return (
      <div className="container mt-5">
        <h2>Form Nhập Thông Tin sinh vieen</h2>
        <form onSubmit={this.handleSubmit} className="border rounded-2 p-4">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="productId" className="form-label">
                  ID sinh vien
                </label>
                <input
                  data-type="number"
                  type="text"
                  className="form-control"
                  name="id"
                  id="xinchaobc64"
                  placeholder="Nhập ID sinh viên"
                  value={id}
                  onInput={this.handleChangeInput}
                />
                <p style={{ height: '30px' }} className="text-danger">
                  {this.state.errValue.id}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  số điện thoại
                </label>
                <input
                  type="phonenumber"
                  data-type="string"
                  className="form-control"
                  name="sdt"
                  value={sdt}
                  placeholder="Nhập số điện thoại"
                  onInput={this.handleChangeInput}
                />
                <p style={{ height: '30px' }} className="text-danger">
                  {this.state.errValue.sdt}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  họ tên
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="nameSV"
                  value={nameSV}
                  placeholder="Nhập tên sinh viên"
                  onInput={this.handleChangeInput}
                />
                <p style={{ height: '30px' }} className="text-danger">
                  {this.state.errValue.nameSV}
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">
                  email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={email}
                  placeholder="Nhập email sinh vien"
                  onInput={this.handleChangeInput}
                />
                <p style={{ height: '30px' }} className="text-danger">
                  {this.state.errValue.email}
                </p>
              </div>
            </div>
          </div>
          <button
            disabled={!this.state.isSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Thêm Sinh vien
          </button>
          <button
            disabled={!this.state.isSubmit}
            type="button"
            className="btn btn-primary"
            onClick={() => {
              this.props.handleUpdateProduct(this.state.value);
            }}
          >
            Cập nhật sinh vien
          </button>
        </form>
      </div>
    );
  }
}
