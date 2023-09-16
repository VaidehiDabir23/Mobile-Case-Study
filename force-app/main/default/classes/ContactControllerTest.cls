@isTest
public class ContactControllerTest {
  //This method tests the happy scenario when multiple contacts associated with a single account are returned.
  @isTest
  static void testGetContactsByAccountId() {
    TestDataFactory.createContactsWithAccountIds(4, 3);

    Account acc = [SELECT Id FROM Account].get(0);
    List<Contact> testContacts = [
      SELECT Id, AccountId
      FROM Contact
      WHERE AccountId = :acc.Id
    ];

    Test.startTest();
    List<Contact> returnedContacts = ContactController.getContactsByAccountId(
      acc.Id
    );
    Test.stopTest();

    Assert.areEqual(testContacts.size(), returnedContacts.size());
  }

  //This method tests the scenario when an account has no related contacts
  @isTest
  static void testGetContactsByAccountId_ZeroContacts() {
    TestDataFactory.createAccounts(10);

    Account acc = [SELECT Id FROM Account].get(0);
    List<Contact> testContacts = [
      SELECT Id, AccountId
      FROM Contact
      WHERE AccountId = :acc.Id
    ];

    Test.startTest();
    List<Contact> returnedContacts = ContactController.getContactsByAccountId(
      acc.Id
    );
    Test.stopTest();

    Assert.areEqual(0, returnedContacts.size());
  }

  //This code tests how the system behaves when null is passed to the method as accountId
  @isTest
  static void testGetContactsByAccountId_NullAccountId() {
    try {
      List<Contact> returnedContacts = ContactController.getContactsByAccountId(
        null
      );
      Assert.fail('Expected an AuraHandledException');
    } catch (Exception e) {
      Assert.isInstanceOfType(
        e,
        AuraHandledException.class,
        'Expected an instance of AuraHandledException'
      );
    }
  }

  //This method tests the scenario when an invalid account Id is passed to the method. It neither returns the record nor throwa any exception.
  @isTest
  static void testGetContactsByAccountId_InvalidAccountId() {
    Test.startTest();
    List<Contact> returnedContacts = ContactController.getContactsByAccountId(
      'invalidId'
    );
    Test.stopTest();

    Assert.areEqual(0, returnedContacts.size());
  }
}
