import { LightningElement, track, api } from "lwc";
import getContactsByAccountId from "@salesforce/apex/ContactController.getContactsByAccountId";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

//Define columns for data table
const columns = [
  { label: "Name", fieldName: "Name" },
  { label: "Email", fieldName: "Email" },
  { label: "Contact-Level", fieldName: "Contact_Level__c" },
  {
    type: "button-icon",
    initialWidth: 34,
    typeAttributes: {
      iconName: "utility:edit",
      name: "edit"
    }
  }
];

export default class ContactView extends LightningElement {
  @api accountName;
  @track contacts;
  @track columns = columns;
  numberOfContacts;
  editContact = false;
  contactId;
  showspinner;

  //Getter and setter are written here to execute the same logic on change of account
  idOfAccount;
  @api get accountId() {
    return this.idOfAccount;
  }
  set accountId(value) {
    this.setAttribute("accountId", value);
    this.idOfAccount = value;
    this.handleAccountChange(value);
  }

  connectedCallback() {
    this.showspinner = true;
    this.getContactsList(this.accountId);
  }

  //This function gets updated contact list as per the account whenever user selects account
  handleAccountChange(value) {
    this.getContactsList(value);
    this.contactId = null; // Not that much required since we are making editContact= false here. So whenever the user clicks on edit icon, the record ID is passed. Think on this.
    this.editContact = false;
  }

  //This function imperatively calls the controller method and gets the contacts on the component
  getContactsList(accountId) {
    getContactsByAccountId({ accountId: accountId })
      .then((response) => {
        this.contacts = response;
        this.numberOfContacts = this.contacts.length;
        this.showspinner = false;
      })
      .catch((error) => {
        const toastEvent = new ShowToastEvent({
          title: "Error!",
          message: error.body.message,
          variant: "error",
          mode: "dismissable"
        });
        this.dispatchEvent(toastEvent);
      });
  }

  //This function reloads the data table when the contact record is updated
  handleContactUpdate() {
    this.getContactsList(this.accountId);
    this.editContact = false;
  }

  //This function is responsible to hide the contactEdit component when user clicks on 'Cancel'
  handleCancelClicked() {
    this.editContact = false;
  }

  //This function is written to easily add more actions in future
  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    switch (actionName) {
      case "edit":
        this.editRow(row);
        break;
      default:
    }
  }

  //This function is dedicated to handle the edit action on contact
  editRow(row) {
    this.editContact = true;
    this.contactId = row.Id;
  }
}
