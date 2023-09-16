//This class contains common code to create the account and contact record that is needed by more than one test classes.
@isTest
public with sharing class TestDataFactory {
  public static List<Account> createAccounts(Integer numberofRecords) {
    List<Account> accounts = new List<Account>();

    for (Integer i = 1; i <= numberOfRecords; i++) {
      accounts.add(new Account(Name = 'Name_' + i));
    }

    insert accounts;
    return accounts;
  }

  public static List<Contact> createContactsWithAccountIds(
    Integer numberofAccounts,
    Integer numberOfContactsPerAccount
  ) {
    List<Account> accounts = TestDataFactory.createAccounts(numberofAccounts);
    List<Contact> contacts = new List<Contact>();

    for (Account acc : accounts) {
      for (Integer i = 0; i < numberOfContactsPerAccount; i++) {
        Contact record = new Contact(
          LastName = 'Contact_' + i + 'For_' + acc.Name,
          Email = 'test_' + acc.Name + i + '@email.com',
          AccountId = acc.Id
        );
        contacts.add(record);
      }
    }
    insert contacts;
    return contacts;
  }
}
