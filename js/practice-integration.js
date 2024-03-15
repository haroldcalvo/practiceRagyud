let subscriber_management = 
  [
    {
      "subscriber_user": "Harold",
      "id": 0,
      "data": {
        "Application": [
          "Fund",
          "Account Payable",
          "Account Receivable"
        ],
        "Dimension": [
          "Dimension 1",
          "Dimension 2",
          "Dimension 3"
        ]
      }
    },
    {
      "subscriber_user": "Medy",
      "id": 1,
      "data": {
        "Application": [
          "Fund",
          "Account Payable",
          "Account Receivable"
        ],
        "Dimension": [
          "Dimension 1",
          "Dimension 2",
          "Dimension 3"
        ]
      }
    },
    {
      "subscriber_user": "James",
      "id": 2,
      "data": {
        "Application": [
          "Fund",
          "Account Payable",
          "Account Receivable"
        ],
        "Dimension": [
          "Dimension 1",
          "Dimension 2",
          "Dimension 3"
        ]
      }
    }
  ]
  // console.log(subscriber_management[0].data);

$(document).ready(function(){
  $.each(subscriber_management,function(index , subcriberVal){
    $('#SelectOpt').append(`<option value="${subcriberVal.id}">${subcriberVal.subscriber_user}</option>`);

  })
  $('#SelectOpt').change(function(){
    $('#tableBody').empty();
    let selectedOption = $('#SelectOpt option:selected').text();
    console.log("Selected option:", selectedOption);
    
    let subscriberData = subscriber_management.find(subscriber => subscriber.subscriber_user === selectedOption);
    
    if(subscriberData) {
        let applicationTab = subscriberData.data.Application;
        let dimensionTab = subscriberData.data.Dimension;
        
        // Loop through each application and dimension
        for(let i = 0; i < applicationTab.length; i++) {
            let applicationValue = applicationTab[i];
            let dimensionValue = dimensionTab[i];
            
            let tableRow = $('<tr>');
            
            // Populate application value
            let appTd = $('<td>').text(applicationValue);
            tableRow.append(appTd);
            
            // Populate dimension value
            let dimTd = $('<td>').text(dimensionValue);
            tableRow.append(dimTd);
            
            $('#tableBody').append(tableRow);
        }
    } else {
        console.log("Subscriber not found.");
    }
});




  // if(SelectOptId.val() === )
})

// let selectId = 'selectCurrent'
// let parentSubscriber = $('.selectSubscriber');

// $.each(subscriber_management,function(index , subcriberVal){
//   let test = $('.test');
//   let subscriberName = subcriberVal['subscriber user'];
//   let tableSubscriber = `
//     <option value="${index}">${subscriberName}</option>
// `
// debugger;

//   if( index + 1 === subscriber_management.length){
//   let selectEle= $('#SelectOpt'); 
//     $(tableSubscriber).append(selectEle);
//   }
// })




// let subscriber_management = [
//   Subscriber_User [
//     'harold@yahoo.com',
//     {
//       Application :[
//         'Fund',
//         'Account Payable',
//         'Account Receivable'
//       ],
//       Dimension : [
//         'Dimension 1',
//         'Dimension 2',
//         'Dimension 3'
//       ]
//     }
//   ],
//   Subscriber_User [
//     'harold@yahoo.com'
//     {
//       Application :[
//         'Fund',
//         'Account Payable',
//         'Account Receivable'
//       ],
//       Dimension : [
//         'Dimension 1',
//         'Dimension 2',
//         'Dimension 3'
//       ]
//     }
//   ],
  
// ]