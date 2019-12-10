import React from 'react';
//import WebSocket from 'ws';
import TableData from './Table';
 
class Main extends React.Component {

    // instance of websocket connection as a class property
    state = {
        calls: [],
        ws: null

    }

    timeout = 2500;
    connect = () => {
        var ws = new WebSocket("wss://juhbg8r319.execute-api.us-west-2.amazonaws.com/TEST");
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");
            var data = JSON.stringify({action: "getData", contactId: "638d727c-c77f-4fb9-9745-95f46516302c"})
            ws.send(data);
            console.log("data sent");
            this.setState({ ws: ws });

            that.timeout = 2500; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        ws.onmessage = evt => {
            var data = JSON.parse(evt.data)
            console.log(data['type'])
            if(data["type"] === "callconnected")
            {
                console.log(data['data'])
                this.setState(prevState => {
                    let calls = [...prevState.calls]
                    calls = [
                        ...calls,
                         {
                            phoneNumber:  data['data'],
                            realtimetransciption: [],
                            voicemail : false,
                            transciption : false,
                            comprehend : false,
                            notif: false,
                            offer: false,
                            confirm: false,
                            disconnected: false

                        }
                    ]
                    return {calls}
                })
            }
            else if(data["type"] === "chat")
            {
                console.log(data['data'])
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.phoneNumber === data["phoneNumber"])
                    let calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    let realtimetransciption = [...call['realtimetransciption']]
                    if(data["isPartial"] === "true")
                    {
                        realtimetransciption.splice(realtimetransciption.length - 1, 1, data['data'])
                    }
                    else
                    {
                        realtimetransciption.splice(realtimetransciption.length - 1, 1, data['data'])
                        realtimetransciption.push("")
                    }
                    calls[callIndex] = {...call, realtimetransciption}
                    return {calls}
                    
                })   
            }
            else if(data["type"] === "confirm")
            {
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.phoneNumber === data["phoneNumber"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, confirm: true}
                    return {calls}
                    
                })   
            }
            else if(data["type"] === "notify")
            {
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.phoneNumber === data["phoneNumber"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, notif: true}
                    return {calls}
                    
                })  
            }
            else if(data["type"] === "offer")
            {
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.phoneNumber === data["phoneNumber"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, offer: true}
                    return {calls}
                    
                })  
            }
            else if(data["type"] === "voicemailstart")
            {
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.phoneNumber === data["phoneNumber"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, voicemail: true}
                    return {calls}
                    
                })  
            }
            else if(data["type"] === "voicemailfinish")
            {
                //console.log(data['data'])
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.phoneNumber === data["phoneNumber"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, voicemail: "done"}
                    return {calls}
                    
                })  
            }
            else if(data["type"] === "transcribestart")
            {
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.phoneNumber === data["phoneNumber"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, transciption: true}
                    return {calls}
                    
                })  
            }
            else if(data["type"] === "transcribefinish")
            {
                console.log(data['data'])
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.phoneNumber === data["phoneNumber"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, transciption: data["data"]}
                    return {calls}
                    
                })  
            }
            else if(data["type"] === "comprehendstart")
            {
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.phoneNumber === data["phoneNumber"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, comprehend: true}
                    return {calls}
                    
                })  
            }
            else if(data["type"] === "comprehendfinish")
            {
                console.log(data['data'])
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.phoneNumber === data["phoneNumber"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, comprehend: data["data"]}
                    return {calls}
                    
                })  
            }
            else if(data["type"] === "calldisconnected")
            {
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.phoneNumber === data["phoneNumber"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, disconnected: true}
                    return {calls}
                    
                })  
            }
            
        }

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 10000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };
    };

    check = () => {
        const { ws } = this.state;
        if (!ws || ws.readyState == WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };

    componentDidMount() {
        // this.ws.onopen = () => {
        // // on connecting, do nothing but log it to the console
        // console.log('connected')
        // var data = JSON.stringify({action: "getData", contactId: "638d727c-c77f-4fb9-9745-95f46516302c"})
        //     this.ws.send(data);
        //     console.log("data sent");
        // }
        this.connect();
        

    }

    render(){
        let data = this.state.calls.map(item => {
            //console.log(item)
            let text = ""
            item.realtimetransciption.map(x => {
                text = text + " " + x;
            });
            //console.log("texT" + text)
            return <TableData key={item["phoneNumber"]} callsconnected={item["phoneNumber"]} realtimetransciption={text} voicemail={item["voicemail"]} transciption={item["transciption"]} comprehend={item["comprehend"]} notif={item["notif"]} offer={item["offer"]} confirm={item["confirm"]} calldisconnected={item["disconnected"]}></TableData>
        })
       // console.log(data)
        return <div>{data}</div>;
        // var transcript = this.state.dataFromServer.map((itemName, i) => 
        //     <h2 key={i}>{itemName}</h2>
        // )
        // var callsconn = this.state.callsconnected.forEach((number) =>
        //     <h2 key={number}>{number}</h2>
        // )
        // var data = JSON.stringify({action: "getData", contactId: "638d727c-c77f-4fb9-9745-95f46516302c"})
        //     return <div>
        //     <button onClick={() => {this.ws.send(data); console.log("data sent")}}>Click here to connect</button>
        //     <br></br>{callsconn}<br></br>
        //     {transcript}</div>;

    }
}
export default Main;