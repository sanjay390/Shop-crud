import React, { Component } from "react";
import toastr from "cogo-toast";

class Create extends Component {
  constructor() {
    super();
    //--- Declare state variable for this component ---//
    this.state = {
      errors: [],
      shopName: "",
      shopArea: "",
      category: "",
      openingDate: "",
      closingDate: "",
    };
    //--- Declare method for this component ---//
    this.baseState = this.state;
    this.hasErrorFor = this.hasErrorFor.bind(this);
    this.renderErrorFor = this.renderErrorFor.bind(this);
    this.handleInsertUser = this.handleInsertUser.bind(this);
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
  }
  //--- Update state variable value while input field change ---//
  handleInputFieldChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  //--- Insert new user in users state array by props method ---//
  handleInsertUser(e) {
    e.preventDefault();
    const data = {
      id: Math.floor(Math.random() * 100),
      shopName: this.state.shopName,
      shopArea: this.state.shopArea,
      category: this.state.category,
      openingDate: this.state.openingDate,
      closingDate: this.state.closingDate,
    };
    if (!this.checkValidation(data)) {
      this.reset();
      this.props.updateState(data, 0);
      document.getElementById("closeAddModal").click();
      toastr.success("New Shop added successfully!", {
        position: "top-right",
        heading: "Done",
      });
    }
  }
  //--- Validate all input field ---//
  checkValidation(fields) {
    var error = {};
    if (fields.shopName.length === 0) {
      error.shopName = ["This field is required!"];
    }
    if (fields.shopArea.length === 0) {
      error.shopArea = ["This field is required!"];
    }
    if (fields.category.length === 0) {
      error.category = ["This field is required!"];
    }
    // if (fields.openingDate.length === 0) {
    //   error.openingDate = ["This field is required!"];
    // }
    // if (fields.closingDate.length === 0) {
    // 	error.closingDate = ["This field is required!"];
    //   }
    // this.setState({
    //   errors: error,
    // });
    // if (
    //   fields.shopName.length === 0 ||
    //   fields.shopArea.length === 0 ||
    //   fields.category.length === 0

    // ) {
    //   return true;
    // } else {
    //   return false;
    // }
  }
  //--- Reset all state variable while insert new user ---//
  reset() {
    this.setState(this.baseState);
  }
  //--- Check that any validation errors occure for input field ---//
  hasErrorFor(fieldName) {
    return !!this.state.errors[fieldName];
  }
  //--- Render error for specific validation fail input field ---//
  renderErrorFor(fieldName) {
    if (this.hasErrorFor(fieldName)) {
      return (
        <em className="error invalid-feedback">
          {" "}
          {this.state.errors[fieldName][0]}{" "}
        </em>
      );
    }
  }

  render() {
    return (
      <div className="row">
        <div
          className="modal fade"
          id="addModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Shop</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={this.handleInsertUser}>
                <div className="modal-body col-sm-12 col-lg-12 col-md-12">
                  <div className="form-group">
                    <label htmlFor="shopName" className="col-form-label">
                      Shop name:
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-sm ${this.hasErrorFor('shopName') ? 'is-invalid' : ''}`}
                      id="shopName"
                      name="shopName"
                      placeholder="Shop name"
                      onChange={this.handleInputFieldChange}
                      value={this.state.shopName}
					  
                    />
                    {/* {this.renderErrorFor("shopName")} */}
                  </div>
                  <div className="form-group">
                    <label htmlFor="shopArea" className="col-form-label">
                      Shop Area:
                    </label>
                    <br />
                    <select
                      name="shopArea"
                      onChange={this.handleInputFieldChange}
                      value={this.state.shopArea}
                      className="form-control form-control-sm"
                    >
                      <option value="Thane">Thane</option>
                      <option value="Pune">Pune</option>
                      <option value="Mumbai Suburban">Mumbai Suburban</option>
                      <option value="Nashik">Nashik</option>
                      <option value="Nagpur">Nagpur</option>
                      <option value="Ahmednagar">Ahmednagar</option>
                      <option value="Solapur">Solapur</option>
                    </select>
                    {/* {this.renderErrorFor("shopArea")} */}
                  </div>
                  <div className="form-group">
                    <label htmlFor="category" className="col-form-label">
                      Shop Category:
                    </label>
                    <br />
                    <select
                      name="category"
                      onChange={this.handleInputFieldChange}
                      value={this.state.category}
                      className="form-control form-control-sm"
                    >
                      <option value="Grocery">Grocery</option>
                      <option value="Butcher">Butcher</option>
                      <option value="Baker">Baker</option>
                      <option value="Chemist">Chemist</option>
                      <option value="Stationery">Stationery</option>
                    </select>
                    {/* {this.renderErrorFor("category")} */}
                  </div>
                  <div className="form-group">
                    <label htmlFor="openingDate" className="col-form-label">
                      Opening Date:
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="openingDate"
                      name="openingDate"
                      placeholder="Opening Date"
                      onChange={this.handleInputFieldChange}
                      value={this.state.openingDate}
                    />
                    {this.renderErrorFor("shopName")}
                  </div>
                  <div className="form-group">
                    <label htmlFor="closingDate" className="col-form-label">
                      Closing Date:
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      id="closingDate"
                      name="closingDate"
                      placeholder="Opening Date"
                      onChange={this.handleInputFieldChange}
                      value={this.state.closingDate}
                    />
                    {this.renderErrorFor("closingDate")}
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    id="closeAddModal"
                    className="btn btn-secondary btn-sm"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Save User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Create;
