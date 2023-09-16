public with sharing class ContactController {
  //This method accepts the accountId as a parameter and returns the list of contacts associated with the same.
  @AuraEnabled
  public static List<Contact> getContactsByAccountId(String accountId) {
    if (String.isBlank(accountId)) {
      throw new AuraHandledException(
        'Please check the account ID once again or contact the System Administrator.'
      );
    }
    return [
      SELECT Id, Name, Email, Contact_Level__c
      FROM Contact
      WHERE AccountId = :accountId
    ];
  }
}
