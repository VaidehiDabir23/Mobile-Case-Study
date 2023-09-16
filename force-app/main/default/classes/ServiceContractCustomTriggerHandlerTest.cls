@isTest
public with sharing class ServiceContractCustomTriggerHandlerTest {
  //This method creates the contract records
  static void createContracts(Integer numberOfRecords) {
    Account acc = TestDataFactory.createAccounts(1).get(0);
    List<Service_Contract__c> contracts = new List<Service_Contract__c>();
    for (Integer i = 0; i < numberOfRecords; i++) {
      Service_Contract__c contract = new Service_Contract__c();
      contract.Account__c = acc.Id;
      contracts.add(contract);
    }
    insert contracts;
  }

  //This method only inserts the record so that the trigger is executed and consequently tested.
  @isTest
  static void testAssignContractStatusThroughTrigger() {
    ServiceContractCustomTriggerHandlerTest.createContracts(10);
    List<Service_Contract__c> contracts = [
      SELECT Id, Status__c
      FROM Service_Contract__c
      WHERE Status__c = 'New'
    ];
    Assert.areEqual(10, contracts.size());
  }

  //This method tests the method of the triggerHandler by calling it directly
  @isTest
  static void testAssignContractStatusDirect() {
    List<Service_Contract__c> contracts = new List<Service_Contract__c>();
    for (Integer i = 0; i <= 5; i++) {
      Service_Contract__c contract = new Service_Contract__c();
      contracts.add(contract);
    }
    ServiceContractCustomTriggerHandler.assignContractStatus(contracts);

    Integer counter = 0;
    for (Service_Contract__c contract : contracts) {
      if (contract.Status__c.equals('New')) {
        counter++;
      }
    }
    Assert.areEqual(6, counter);
  }
}
