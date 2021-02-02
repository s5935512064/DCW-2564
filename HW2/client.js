var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();
const readline = require('readline');

function prompt(question) {  //สร้างฟังก์ชัน prompt สำหรับรับค่าจากทางคีย์บอร์ด
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(function (resolve, reject) {  //call back function
        rl.question(question, function (answer) { 
            rl.close();
            resolve(answer.trim()); //ฟังก์ชัน Callback ของเมธอด question ส่งค่าที่รับเข้ามาผ่านทางพารามิเตอร์ answer
        });
    });
}

   client.connect(PORT, HOST, function() {
   console.log('CONNECTED TO: ' + HOST + ':' + PORT);
   (async function () {
      let stid = await prompt('Enter your student id: '); 
      client.write(stid.toString());
   })();
   });

client.on('data', function(data) {
   console.log('DATA: ' + data);

   if(data.toString() === 'OK!')
   {
   console.log('PREDICTION NUMBER 0-21 START!');
   (async function () {
      let stid = await prompt('PREDICT NUMBER: '); 
      client.write(stid.toString());
   })();
   }
   else if(data.toString() === 'THE ANSWER MORE THAN YOUR NUMBER')
   {
      (async function () {
         let stid = await prompt('PREDICT NUMBER: '); 
         client.write(stid.toString());
      })();
   }
   else if(data.toString() === 'THE ANSWER LESS THAN YOUR NUMBER')
   {
      (async function () {
         let stid = await prompt('PREDICT NUMBER: '); 
         client.write(stid.toString());
      })();
   }
   else if(data.toString() === 'BINGO')
   {
        console.log('SUBMIT');
        client.destroy();
   }
   
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
   console.log('Connection closed');
});