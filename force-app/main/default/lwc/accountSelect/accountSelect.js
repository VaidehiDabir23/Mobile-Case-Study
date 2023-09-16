import { LightningElement, track } from "lwc";
import getAccounts from "@salesforce/apex/AccountController.getAccounts";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class AccountSelect extends LightningElement {
  value = "";
  accountName = "";
  @track optionsArray = [];
  cardVisible = false;
  accountId;
  showspinner;

  get options() {
    return this.optionsArray;
  }
  connectedCallback() {
    this.showspinner = true;
    getAccounts()
      .then((response) => {
        let arr = [];
        for (var i = 0; i < response.length; i++) {
          arr.push({ label: response[i].Name, value: response[i].Id });
        }
        this.optionsArray = arr;
        this.showspinner = false;
      })
      .catch((error) => {
        this.showspinner = false;
        const toastEvent = new ShowToastEvent({
          title: "Error",
          message:
            "Error while loading data. Please contact the system administrator.",
          variant: "error",
          mode: "dismissable"
        });
        this.dispatchEvent(toastEvent);
      });
  }

  //The accountId field is updated which is further passed to the contactView component to fetch contacts related to new account
  handleAccountChange(event) {
    this.value = event.detail.value;
    this.cardVisible = true;
    const selectedAccount = this.optionsArray.filter(function (selectedOption) {
      return selectedOption.value === event.detail.value;
    });
    this.accountName = selectedAccount[0].label;
    this.accountId = selectedAccount[0].value;
  }

  //This hides all the visible components and makes the dropdown of account empty
  handleClearClick() {
    this.value = null;
    this.cardVisible = false;
    this.accountName = null;
  }
}
