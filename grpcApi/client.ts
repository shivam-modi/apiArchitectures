import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/random';
import readline from 'readline';

const PORT = 8082;

const PROTO_FILE = './proto/random.proto'; 

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));

const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType;

const client = new grpcObj.randomPackage.Random(`0.0.0.0:${PORT}`, grpc.credentials.createInsecure());

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (err) => {
    if(err){
        console.error(err);
        return;
    }
    console.log('Client connected to server');
    onClientReady();
});

function onClientReady(){
    /**Only ping */

    // client.PingPong({message: 'Hello from Client'}, (err, res) => {
    //     if(err){
    //         console.error(err);
    //         return;
    //     }
    //     console.log(`Response from server: ${JSON.stringify(res)}`);
    // });

    /**Server stream */
    // const stream = client.RandomNumbers({maxVal: 95});
    // stream.on('data', (chunck) => {
    //   console.log(chunck);
    // });

    // stream.on('end', () => {
    //     console.log('Server done');
    // });

    /**Client stream */
  
    // const stream = client.TodoList((err, res) => {
    //     if(err){
    //         console.error(err);
    //         return;
    //     }
    //     console.log(res);
    // });

    // stream.write({status: "Never", todo: 'Go to pub'});
    // stream.write({status: "Always", todo: 'Buy Snacks'});
    // stream.write({status: "Sometimes", todo: 'Make Dinner'});
    // stream.write({status: "Always", todo: 'Go to bed'});
    // stream.write({status: "Always", todo: 'Wake up'});
    // stream.write({status: "Always", todo: 'Go to work'});
    // stream.write({status: "Always", todo: 'Write Code'})
    // stream.write({status: "Sometimes", todo: 'Go home'});
    // stream.end();

    /**Bi-directional stream */
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const username = process.argv[2];
    if(!username){
        console.error('Username is required');
        process.exit(1);
    }
    const metadata = new grpc.Metadata();
    metadata.set('username', username);
    const call = client.Chat(metadata);
    call.write({message: 'Register'});

    call.on('data', (chunk) => {
        console.log(`${chunk.username}:==> ${chunk.message}`);
    });

    rl.on('line', (line) => {
      if(line === 'quit') {
        call.end();
        rl.close();
        return;
      } else {
        call.write({message: line});
      }
    })
}