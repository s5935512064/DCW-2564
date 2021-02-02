var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;
net.createServer(function(sock) {
   console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    let count = 0;
    let answer=Math.floor(Math.random() * 21);
    answer = parseInt(answer);
    console.log('ANSWER : ' + answer);
   sock.on('data', function(data) {
       console.log('DATA ' + sock.remoteAddress + ': ' + data);

       if(count == 0 && data.length == 10){
            sock.write('OK!');
            count++;
       }
       else if(count != 0 && count <= 4){
           if(data == answer)
           {
            sock.write('BINGO');
            sock.destroy();
           }
           else if (data < answer){
            sock.write('THE ANSWER MORE THAN YOUR NUMBER');
            count++; 
           }  
           else if (data > answer){
            sock.write('THE ANSWER LESS THAN YOUR NUMBER');
            count++; 
           } 
       }
       else if (count == 5){
            if(data == answer)
            {
            sock.write('BINGO');
            sock.destroy();
            }
            else{
            sock.write('END');
            sock.destroy(); 
            }  
    }
       else{
        sock.write('Wrong Username');
        sock.destroy(); 
       }
   });
   sock.on('close', function(data) {
       console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
   });
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);