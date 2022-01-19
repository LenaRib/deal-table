import React from 'react';
import DealTable from '../component/table/dealTable';
import { AppContext } from '../context/app.context';

import Filter from '../component/filter/filter';
import FilterItem from '../component/filter/filterItem';
import FilterType from '../component/filter/filterType';

export default class MainPage extends React.Component {
    constructor() {
        super();
        this.filterItems = [
            new FilterItem(FilterType.Hidden, 'id', 'field-id', { Typing: 'Y', PREFIX: 'Y' }),
            new FilterItem(FilterType.UserSelect, 'property_user', 'field-responsible', { Default: 'Y' }),
            new FilterItem(FilterType.DateRange, 'property_date', 'field-date', { NUMBER: 'Y' })
        ];

        this.table = React.createRef();
        this.filter = React.createRef();
    }
    
    static contextType = AppContext;

    refreshTable = () => {
        if (this.table && this.table.current) {
            this.table.current.tryLoadData();
        }
    }


    render() {
        return (
            <div>
                <div className="d-xl-flex mb-3 mt-3">
                    <Filter ref={this.filter} id={'filter-log'} items={this.filterItems} refreshTable={this.refreshTable} />
                </div>
                <DealTable ref={this.table} filter={this.filter} />
            </div>
        );
    }
}
