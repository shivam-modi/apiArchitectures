import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/random';

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
    // client.PingPong({message: 'Hello from Client'}, (err, res) => {
    //     if(err){
    //         console.error(err);
    //         return;
    //     }
    //     console.log(`Response from server: ${JSON.stringify(res)}`);
    // });

    // const stream = client.RandomNumbers({maxVal: 95});
    // stream.on('data', (chunck) => {
    //   console.log(chunck);
    // });

    // stream.on('end', () => {
    //     console.log('Server done');
    // });

    const stream = client.TodoList((err, res) => {
        if(err){
            console.error(err);
            return;
        }
        console.log(res);
    });

    stream.write({status: "Never", todo: 'Go to pub'});
    stream.write({status: "Always", todo: 'Buy Snacks'});
    stream.write({status: "Sometimes", todo: 'Make Dinner'});
    stream.write({status: "Always", todo: 'Go to bed'});
    stream.write({status: "Always", todo: 'Wake up'});
    stream.write({status: "Always", todo: 'Go to work'});
    stream.write({status: "Always", todo: 'Write Code'})
    stream.write({status: "Sometimes", todo: 'Go home'});
    stream.end();
}