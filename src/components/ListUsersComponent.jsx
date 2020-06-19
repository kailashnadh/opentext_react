import React, { Component } from 'react'
import ProductDataService from '../api/ProductDataService.js'
import DataComponent from './DataComponent.jsx'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

class ListUsersComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //to define user state 
            users: [],
            //to define products state 
            products: [],
            //to define data state to be sent for table 
            loadingData: [],
            //to define filter type value in the dropdown
            filterType: "All Products"
        }
        this.getUserData = this.getUserData.bind(this)
        this.getMapdata = this.getMapdata.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }


    componentDidMount() {
        //calling getUserData function on page load
        this.getUserData();
    }



    getUserData() {
        //Fetch data from API and store it in state values
        ProductDataService.retrieveAllProducts()
            .then(
                response => {
                    this.setState({ users: response.data.users, products: response.data.productCategories })
                    //get the data to be diplayed for the User from getMapData function
                    var newData = this.getMapdata();
                    this.setState({ loadingData: newData })
                }
            )
    }

    
    getMapdata() {
        //Storing the Subscription Id and its price in a map
        var smap = new Map();
        var productCategories = this.state.products;
        var count = 1;
        var finalArray = [];
        var users = this.state.users;
        //Fetching and mapping data to smap for each subscription id
        productCategories.forEach(function (current1) {
            let products = current1.products;
            products.forEach(function (current2) {
                var subscriptions = current2.subscriptions;
                subscriptions.forEach(function (current3) {
                    //get the Validity in readable format by month or year for each product
                    var months = current3.months;
                    var output;

                    if (months != null) {
                        var years = months / 12;
                        var month = months % 12;

                        if (month !== 0) {
                            output = month + ' month'
                        } else if (years === 1) {
                            output = years + ' year'
                        } else if (years !== 0) {
                            output = years + ' years'
                        }
                    }
                   
                    //round each price to 2 decimals
                    var price = parseFloat(current3.price).toFixed(2);
                    

                    var subscriptionArray = [];

                    let id = current3.id;
                    subscriptionArray.push({
                        type: current1.type,
                        displayName: current1.displayName,
                        productName: current2.name + ' - ' + output,
                        sku: current2.sku,
                        price: price
                    })
                    smap.set(id, subscriptionArray);
                });

            });

        });

        //Map the Product data for each User according to user's subscription using smap. 
        users.forEach(function (current) {
            var ids = current.subscriptionIds;
            //append $ for price
            ids.forEach(function (current1) {
                var sd = smap.get(current1);
                finalArray.push({
                    keyId: count,
                    name: current.firstName + ' ' + current.lastName,
                    email: current.email,
                    subscriptionId: current1,
                    productType: sd[0].type,
                    categoryName: sd[0].displayName,
                    productName: sd[0].productName,
                    sku: sd[0].sku,
                    price:'$'+ sd[0].price
                });
                count++
            });
        });
        //Retutn the array having User and his subscription product details.
        return finalArray
    }


    //Handles user filter request and set the state of Table data according to  filter request
    handleClick(event) {
        console.log("in handle click", event)
        var data = this.getMapdata();
        var filterType;
        data = data.filter(function (item) {
            return item.productType.includes(event);
        });
        if (event === "") {
            filterType="All Products"
        }else{
            filterType= "Filter By " + event
        }
        
       
        this.setState({ loadingData: data, filterType: filterType })
    }



    //render the view using Data component and send loading data as props & defined dropdown
    render() {

        return (
            <div className="container">
                <br></br>
                <div className="row">
                    <div className="col-md-3">
                        <DropdownButton
                            alignRight
                            title={this.state.filterType}
                            id="dropdown-menu-align-right"
                            onSelect={this.handleClick}
                        >
                            <Dropdown.Item eventKey="" active>All Products</Dropdown.Item>
                            <Dropdown.Item eventKey="Consumer">Fiter By Consumer</Dropdown.Item>
                            <Dropdown.Item eventKey="SMB">Filter By SMB</Dropdown.Item>
                            
                        </DropdownButton>
                    </div>
                </div>
                <DataComponent finalData={this.state.loadingData} filterMethod={this.getMapdata}></DataComponent>
            </div>


        )
    }
}


export default ListUsersComponent