import React, { Component } from "react";
import toastr from "cogo-toast";
import Create from "./Create";

class Index extends Component {
  constructor() {
    super();
    //--- Declare state variable for this component ---//
    this.state = {
      users: [
        {
          shopName: "Jockey Store",
          shopArea: "Nagpur",
          category: "Grocery",
          openingDate: "2022/12/2",
          closingDate: "2022/12/9",
        },
        {
          shopName: "Imagine Store",
          shopArea: "Nagpur",
          category: "Grocery",
          openingDate: "2022/12/3",
          closingDate: "2022/12/7",
        },
        {
          shopName: "Armani Store",
          shopArea: "Nagpur",
          category: "Grocery",
          openingDate: "2022/12/4",
          closingDate: "2022/12/5",
        },
      ],
      editUser: {},
    };
    //--- Declare method for this component ---//
    this.handleUpdateState = this.handleUpdateState.bind(this);
  }
  //--- Update state variable while any user insert or update ---//
  handleUpdateState(data, operation) {
    //--- 'operation==1' means update user ---//
    if (operation === 1) {
      this.setState((prevState) => ({
        users: prevState.users.filter((user) => {
          if (user.id === data.id) return Object.assign(user, data);
          else return user;
        }),
      }));
      return;
    }
    //--- 'operation==0' means insert user ---//
    var new_users = this.state.users.concat(data);
    this.setState({
      users: new_users,
    });
  }
  //--- Find editable user and update state variable ---//
  handleEditUser(userId) {
    this.setState({
      editUser: this.state.users.find((x) => x.id === userId),
    });
  }
  //--- Delete user and update state ---//
  handleDeleteUser(id) {
    this.setState((prevState) => ({
      users: prevState.users.filter((user, i) => {
        return i !== id;
      }),
    }));
    toastr.error("Shop has been deleted successfully!", {
      position: "top-right",
      heading: "Done",
    });
  }

  render() {
    return (
      <div className="card mt-4">
        <div className="card-header">
          <h4 className="card-title"> Shops </h4>
          <button
            type="button"
            className="btn btn-primary btn-sm pull-right"
            data-toggle="modal"
            data-target="#addModal"
          >
            {" "}
            Add Shop{" "}
          </button>
        </div>
        <div className="row">
          <div className="card-body">
            <div className="col-md-12">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th> Shop Name </th>
                    <th> Shop Area </th>
                    <th> Category</th>
                    <th> Opening Date</th>
                    <th> Closing Date</th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((user, i) => (
                    <tr key={i}>
                      <td> {user.shopName} </td>
                      <td> {user.shopArea} </td>
                      <td> {user.category} </td>
                      <td> {user.openingDate} </td>
                      <td> {user.closingDate} </td>
                      <td>
                        {/* <button
                          className="btn btn-info btn-sm mr-2"
                          onClick={this.handleEditUser.bind(this, user.id)}
                          data-toggle="modal"
                          data-target="#editModal"
                        >
                          {" "}
                          Edit{" "}
                        </button> */}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={this.handleDeleteUser.bind(this, i)}
                        >
                          {" "}
                          Delete{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Create updateState={this.handleUpdateState} />
        
      </div>
    );
  }
}
export default Index;
