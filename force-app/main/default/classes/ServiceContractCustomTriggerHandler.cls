public with sharing class ServiceContractCustomTriggerHandler {
  //This method defines the logic to assign a value to the Status__c field of the Service_Contract__c object.
  public static void assignContractStatus(List<Service_Contract__c> contracts) {
    for (Service_Contract__c contract : contracts) {
      contract.Status__c = 'New';
    }
  }
}
