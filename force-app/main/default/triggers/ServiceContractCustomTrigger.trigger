trigger ServiceContractCustomTrigger on Service_Contract__c(before insert) {
  if (Trigger.isBefore && Trigger.isInsert) {
    ServiceContractCustomTriggerHandler.assignContractStatus(Trigger.NEW);
  }
}