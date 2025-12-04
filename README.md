# Interview Task

## Overview

- Lightning web component: Added to the case lightning record page, and can further be added to any lightning record page
- REST API: Retrieves the information of the product bought  by the contact  by using its UUID for the external systems
- Data Validation: Makes sure that only one price is available for a product in a country (Note: Data validation is implemented by considering the business context, although it wasn’t mentioned in the task.)

## Key Setup Instructions

This section covers specific instructions that need to be followed to run this project. After deployment of the components in the folder, these steps need to be followed:

- Give access to all the newly created custom objects/fields/tab to your  user.
- Add LWC ProductInfoComponent to the lightning record page of the Case object from the folder Case_Lightning_Record_Page1. If there is any issue with the  deployment of this record page, you can add  the LWC to any existing case record page, as  it is exposed to it.
- For testing the API, a connected app can be created in the org and can be tested using tools such as Postman. I have also created one in my  org. I can share the required details such as endpoint, client Id, and secret, if needed. 



### Please refer to the pdf document shared with the code folder to know details about Data Model, implementation etc.
