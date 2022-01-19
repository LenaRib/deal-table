import { Rest } from "../rest";

export default class Deal {
    constructor(fields) {
        Object.assign(this, fields);
    }

    get Id() {
        return parseInt(this.ID) || 0;
    }

    get Link() {
        return `https://${Rest.getDomain()}/crm/deal/details/${this.Id}/`;
    }

    get Name() {
        return this.TITLE;
    }

    get ResponsibleId() {
        return parseInt(this.ASSIGNED_BY_ID) || 0;
    }

    get ContactId() {
        return parseInt(this.CONTACT_ID) || 0;
    }
}