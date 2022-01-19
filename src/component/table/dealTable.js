import { Link } from "react-router-dom";
import { DataStorage } from "../../enum/dataStorage";
import { Rest } from "../../rest";
import TableComponent from './tableComponent';
import Deal from '../../models/deal';
import Company from "../../models/company";

class DealTable extends TableComponent {

    constructor() {
        super();
        this.Id = 'deal-table-component';
        // this.state.sortBy = 'id';
        this.state.visibleColumns = ['id', 'property_title', 'property_stage-id', 'property_opportunity', 'property_company-id'];
        const currentDefinition = this;

        this.Header.push({
            text_id: 'id',
            field: 'id',
            //sortable: true,
            getCellObject: function (item) {
                return (<td className="align-middle">{item.ID}</td>);
            }
        });

        this.Header.push({
            text_id: 'наименование',
            field: 'property_title',
            //sortable: true,
            getCellObject: function (item) {
                const link = item.Link;
                return (
                    <td className="align-middle">
                        {
                            <Link to={link}>
                                {item.TITLE}
                            </Link>
                        }
                    </td>
                );
            }
        });

        this.Header.push({
            text_id: 'сумма',
            field: 'property_opportunity',
            //sortable: true,
            getCellObject: function (item) {
                return (
                    <td className="align-middle">
                        {item.OPPORTUNITY}
                    </td>
                );
            }
        });

        this.Header.push({
            text_id: 'Стадия сделки',
            field: 'property_stage-id',
            //sortable: true,
            getCellObject: function (item) {
                return (
                    <td className="align-middle">
                        {item.STAGE_ID}
                    </td>
                );
            }
        });

        this.Header.push({
            text_id: 'клиент',
            field: 'property_company-id',
            getCellObject: function (item) {
              // const result = getCompany(item.COMPANY_ID)
              const company = new Company(item.COMPANY_ID);
              const link = company.Link;
              return (
                    <td className="align-middle">
                      {
                      <Link to={link}>
                        {item.COMPANY_ID}
                      </Link>
                      }
                    </td>
                );
            }
        });

    }

    loadData = async () => {
        const currentDefinition = this;
        const sortBy = currentDefinition.state.sortBy.toUpperCase();
        const sortOrder = currentDefinition.state.sortOrder.toUpperCase();
        var requestData = {
            ENTITY: DataStorage.log,
            SORT: {},
            filter: {},
            start: currentDefinition.getOffset()
            //take: currentDefinition.getStep()
        };
        requestData.SORT[sortBy] = sortOrder;
        // currentDefinition.applyFilter(requestData.filter);

        try {
            const result = await Rest.callMethod('crm.deal.list', requestData);
            const items = result.items.map(x => new Deal(x));
            console.log('items', items);

            currentDefinition.printRows(items, result.total);
        }
        catch (err) {
            currentDefinition.loadDataError(err);
        }
        finally {
            currentDefinition.loadDataAlways();
        }
    }

    getCompany = async (ID) => {
      try {
      const result = await Rest.callMethod('crm.company.get', ID);
      console.log('result', result)
      return result;
      }
      catch(err) {
          this.loadDataError(err);
        }
        return '';
  }
}

export default DealTable;
