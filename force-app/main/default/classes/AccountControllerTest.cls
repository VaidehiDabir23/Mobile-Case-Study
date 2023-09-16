@isTest
public class AccountControllerTest {
  //This method tests the scenario when one or more accounts are present.
  @isTest
  static void testGetAccounts() {
    TestDataFactory.createAccounts(10);
    List<Account> queriedAccounts = [SELECT Id FROM Account];

    Test.startTest();
    List<Account> accountList = AccountController.getAccounts();
    Test.stopTest();

    Assert.areEqual(queriedAccounts.size(), accountList.size());
  }

  //This method tests the scenario when no any account is present.
  @isTest
  static void testGetAccounts_Zero() {
    List<Account> accountList = AccountController.getAccounts();
    Assert.isTrue(0 == accountList.size());
  }
}
