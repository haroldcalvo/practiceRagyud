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
    // $('#tableBody').empty();
    let selectedOption = $('#SelectOpt option:selected');
    if(selectedOption.text() === "Harold"){
      console.log("Option 1 is selected");
      let applicationTab =  subscriber_management[0].data.Application;
      let dimensionTab =  subscriber_management[0].data.Dimension;
      let dimensionEle = '';
      $.each(applicationTab ,function(i , applicationVal){
        let tableRow = $('<tr>');
        let appTd = $('<td>').text(applicationVal);
        $(tableRow).append(appTd);
        $('#tableBody').append(tableRow);
      })
    //   $.each(dimensionTab ,function(i , dimensionVal){
    //     dimensionEle += `<option value="${i+1}">${dimensionVal}</option>`;
    //   })
    //  let getDimension = `
    //   <tr class="appendHere text-center">
    //     <td></td>
    //       <td>
    //         <div class="col-md-7 offset-md-3 mr-auto ml-auto">
    //           <div class="col-sm-12">
    //             <select name="selectSm" id="SelectApp"
    //               class="text-center form-control-sm form-control">
    //               <option value="0">Select Dimension</option>
    //               ${dimensionEle}
    //             </select>
    //           </div>
    //         </div>
    //       </td>
    //   </tr>
    //   `;
      
    //   $('#tableBody').append(getDimension);
   
    }else if (selectedOption.text() === "Medy"){


    }else if (selectedOption.text() === "James"){

    }
    else{
      return false;
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