public with sharing class AccountController {
  //This method fetches all the accounts in the org and return in the form of List<Account>
  @AuraEnabled
  public static List<Account> getAccounts() {
    return [SELECT Id, Name FROM Account];
  }
}
