# Case Study

## Task Overview

- This task achieves to set up an approval process, lookup filter, creation of custom objects and custom fields, autopopulating them using configuration privided by the Salesforce platform.
- Further the task involves displaying the lightning web components, communication among them, fetching data from apex and displaying them in the LWC, handling errors and notifying users in case of errors using the friendly messages.

## Post-deployment Steps

- Assign the permission set named 'Sales and Contract Permission Set' to the user with which the testing is being done.
- Make sure that the user who submits the service contract record for approval has a manager, who further can approve the request.
- Activate the 'Contact List' page from the lightning app builder.
- Edit the step 2 of the approval process and select a user who is the 'Head of sales' as the approver in this step. Since, the step with a user is not deployed, this additional step is required.
