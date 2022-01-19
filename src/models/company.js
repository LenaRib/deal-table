import { Rest } from "../rest";

export default class Company {
    constructor(fields) {
        Object.assign(this, fields);
    }

    get Id() {
         return parseInt(this.ID) || 0;
    }

    get Link() {
        return `https://${Rest.getDomain()}/crm/company/get/${this.Id}/`;
    }

    get Title() {
        if (this.TITLE && this.TITLE.length > 0) {
           return this.TITLE;
        }
        return '';
    }
}
