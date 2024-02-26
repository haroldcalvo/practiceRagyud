
jsonObjExecuteService = {};
jsonObjExecuteService ["procedure_name_given"] = "getFundsParameter"; //given json element do not remove
jsonObjExecuteService ["method_given"] = "GET"; //given json element do not remove
jsonObjExecuteService ["module_given"] = "Fund-API/fundsparameter"; //given json element do not remove

executeService(jsonObjExecuteService, function(response_from_service) {
    for (let i = 0; i < response_from_service.length; i++) {
        let petty_cash_item =  response_from_service[i].petty_cash_item;
        let amount = response_from_service[i].amount;
        let cash_breakdown_template = response_from_service[i].cash_breakdown_template;
        let cashier_teller_account = response_from_service[i].cashier_teller_account;
        let transfer_float_account = response_from_service[i].transfer_float_account;
        let cash_account = response_from_service[i].cash_account;
        let transaction_open = response_from_service[i].transaction_open;
        let transaction_date = response_from_service[i].transaction_date;
        
        $('.transaction-date-val').attr('data-transaction-open',transaction_open);
        $('.transaction-date-val').val(transaction_date);
    }
});