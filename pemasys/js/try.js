var token = "5a1457961200c02163d88268ef14aea61848beca247217dbc9311bf9a259744b0da98bf3e002a95a5e1f1841124b07d219593c94beba799ba99020efb1458d12";
var constring = "server=192.168.4.216;user id=developer;password=12345678;port=3306;database=entities;";
var response = InvokeService("GetToken_AuthenticationControllers/getTokenAuthentication?intUserId=1&charToken="+token+"&connStr="+constring, "POST", "");
if (response.code == 200) {
    var employees, oEmployees;
    employees = JSON.parse(response.data);
    if (employees.code == 200) {
        console.log(employees.jsonData);
    }
}
