import { LightningElement, api, wire, track } from "lwc";
import { getRecord, updateRecord } from "lightning/uiRecordApi";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import CONTACT_OBJECT from "@salesforce/schema/Contact";
import ID_FIELD from "@salesforce/schema/Contact.Id";
import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import FIRST_NAME_FIELD from "@salesforce/schema/Contact.FirstName";
import LAST_NAME_FIELD from "@salesforce/schema/Contact.LastName";
import CONTACT_LEVEL_FIELD from "@salesforce/schema/Contact.Contact_Level__c";

export default class ContactEditCustom extends LightningElement {
  @api contactId; // Accepts contact Id from the parent component
  recordTypeId;
  picklistValues;
  disabled;
  showspinner;
  @api get disableButton() {
    return this.disabled;
  }
  set disableButton(value) {
    this.setAttribute("disableButton", value);
    this.disabled = value;
  }
  //This property holds the values for contact entered by the user
  @track contactRecord = {
    FirstName: "",
    LastName: "",
    ContactLevel: "",
    Email: ""
  };
  //This property stores the values of the contact record when it was fetched from database
  initialContactRecord = {
    FirstName: "",
    LastName: "",
    ContactLevel: "",
    Email: ""
  };
  @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT })
  objectInfo({ data, error }) {
    if (error) {
      this.displayToastMessage(
        "Error",
        "Error while loading data. Please contact the system administrator.",
        "error"
      );
    } else if (data) {
      this.recordTypeId = data.defaultRecordTypeId;
    }
  }
  @wire(getPicklistValues, {
    recordTypeId: "$recordTypeId",
    fieldApiName: CONTACT_LEVEL_FIELD
  })
  contactLevelValues({ data, error }) {
    if (error) {
      this.displayToastMessage(
        "Error",
        "Error while loading data. Please contact the system administrator.",
        "error"
      );
    } else if (data) {
      this.picklistValues = data.values;
    }
  }
  @wire(getRecord, {
    recordId: "$contactId",
    fields: [
      FIRST_NAME_FIELD,
      LAST_NAME_FIELD,
      EMAIL_FIELD,
      CONTACT_LEVEL_FIELD
    ]
  })
  loadContact({ data, error }) {
    this.showspinner = true;
    if (data) {
      this.contactRecord.FirstName = data.fields.FirstName.value;
      this.contactRecord.LastName = data.fields.LastName.value;
      this.contactRecord.Email = data.fields.Email.value;
      this.contactRecord.ContactLevel = data.fields.Contact_Level__c.value;

      this.initialContactRecord.FirstName = data.fields.FirstName.value;
      this.initialContactRecord.LastName = data.fields.LastName.value;
      this.initialContactRecord.Email = data.fields.Email.value;
      this.initialContactRecord.ContactLevel =
        data.fields.Contact_Level__c.value;

      this.disabled = true;
      this.showspinner = false;
    } else if (error) {
      this.showspinner = false;
      this.displayToastMessage(
        "Error",
        "Error while loading data. Please contact the system administrator.",
        "error"
      );
    }
  }

  //This function determines whether the contact record is really modified and whether to enable the save button
  handleFieldChange(event) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.contactRecord[fieldName] = fieldValue;

    this.disabled = !(
      this.initialContactRecord.FirstName !== this.contactRecord.FirstName ||
      this.initialContactRecord.LastName !== this.contactRecord.LastName ||
      this.initialContactRecord.Email !== this.contactRecord.Email ||
      this.initialContactRecord.ContactLevel !== this.contactRecord.ContactLevel
    );
  }

  //This function passes all the values entered by the user to the database and save the record
  handleSave() {
    if (this.validateEmail(this.contactRecord.Email)) {
      this.showspinner = true;
      const fields = {};
      fields[ID_FIELD.fieldApiName] = this.contactId;
      fields[FIRST_NAME_FIELD.fieldApiName] = this.contactRecord.FirstName;
      fields[LAST_NAME_FIELD.fieldApiName] = this.contactRecord.LastName;
      fields[EMAIL_FIELD.fieldApiName] = this.contactRecord.Email;
      fields[CONTACT_LEVEL_FIELD.fieldApiName] =
        this.contactRecord.ContactLevel;
      const recordInput = { fields };

      // Update the record
      updateRecord(recordInput)
        .then(() => {
          this.dispatchEvent(new CustomEvent("contactupdate"));
          this.displayToastMessage("Success", "Contact updated", "success");
          this.showspinner = false;
        })
        .catch((error) => {
          this.displayToastMessage(
            "Error",
            "Error while updating contact. Please contact the system administrator.",
            "error"
          );
          this.showspinner = false;
        });
    } else {
      this.displayToastMessage("Error", "Email format is wrong", "error");
    }
  }

  //This function captures the user's click and sends the update to the parent component
  handleCancel() {
    this.dispatchEvent(new CustomEvent("cancelclicked"));
  }

  //This function checks if the user has entered email correctly
  validateEmail(emailValue) {
    var re = new RegExp("^([A-Za-z0-9._-]+@[a-z0-9-]+.[a-z]{2,})$");
    if (re.test(emailValue)) {
      return true;
    }
    return false;
  }

  //This function holds the common logic to show the toast message that can be used by multiple methods
  displayToastMessage(title, message, variant) {
    const toastEvent = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant,
      mode: "dismissable"
    });
    this.dispatchEvent(toastEvent);
  }
}
