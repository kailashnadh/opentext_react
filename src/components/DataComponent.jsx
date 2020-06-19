import React, { Component } from 'react'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
const { SearchBar } = Search;

//component to display bootstrap table
class DataComponent extends Component {
    //Defining column fields
    columns = [
                {
                    dataField: 'name',
                    text: 'Name',
                    //Adding sorting for Name column
                    sort: true
                },
                {
                    dataField: 'email',
                    text: 'Email'
                },
                {
                    dataField: 'productName',
                    text: 'Subscription'
                },
                {
                    dataField: 'price',
                    text: 'Price'
                },
              ];

    defaultSorted = [{
        dataField: 'name',
        order: 'asc'
    }];

    // Adding Pagination for Table data
    render() {
        const options = {
            sizePerPage: 10,
            hideSizePerPage: true,
            hidePageListOnlyOnePage: true
          };
        if (!this.props.finalData) {
            return (
                <></>
            );
        }

        return (
            //Implemented Search filter using Bootstrap Search Feature
            <div id="customers">
                <ToolkitProvider
                    keyField="keyId"
                    data={this.props.finalData}
                    columns={this.columns}
                    search
                >
                    {
                        props => (
                            <div className="container">
                                <SearchBar {...props.searchProps} />
                                <hr />
                                <BootstrapTable
                                    keyField='keyId'
                                    data={this.props.finalData}
                                    columns={this.columns}
                                    defaultSorted={this.defaultSorted}
                                    pagination={paginationFactory(options)}
                                    {...props.baseProps}
                                />

                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        )
    }
}

export default DataComponent