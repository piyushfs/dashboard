import React from 'react';
//import WebSocket from 'ws';
import TableData from './Table';
import './Style.css';
 
class Main extends React.Component {

    // instance of websocket connection as a class property
    state = {
        calls: [],
        ws: null
    }

    lastCustomer = true;
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
            console.log(data["type"])
            console.log(data)
            if(data["type"] === "callconnected")
            {
               // console.log(data['data'])
                this.setState(prevState => {
                    let calls = [...prevState.calls]
                    calls = [
                        ...calls,
                         {
                            contactId: data['contactId'],
                            phoneNumber:  data['data'],
                            realtimetransciption: [],
                            agent: [],
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
                //console.log(data['data'])
                this.setState(prevState => {
                    // if(data["fromCustomer"] === "true")
                    // {
                        let prepend = ""
                        if(data["fromCustomer"] === "true" && this.lastCustomer === false)
                        {
                            this.lastCustomer = true;
                            prepend = "Customer: "
                        }
                        else if(data["fromCustomer"] === "false" && this.lastCustomer === true){
                            this.lastCustomer = false;
                            prepend = "Agent: "
                        }
                        const callIndex = prevState.calls.findIndex(call => call.contactId === data["contactId"])
                        let calls = [...prevState.calls]
                        const call = {...calls[callIndex]}
                        let realtimetransciption = [...call['realtimetransciption']]
                        if(prepend !== "")
                        {
                            realtimetransciption.push(prepend)
                            realtimetransciption.push("")
                        }
                        if(data["isPartial"] === "true")
                        {
                            // if(data["fromCustomer"] === "false")
                            // {
                            //     realtimetransciption.splice(realtimetransciption.length - 1, 1, <div key= {realtimetransciption.length - 1} style={{backgroundColor:"#82ccdd", padding:"10px", borderRadius:"25px", maxWidth:"50%", whiteSpace:"normal",float:"left"}}>{data['data']}</div>)
                            // }
                            // else if(data["fromCustomer"] === "true")
                            // {
                            //     realtimetransciption.splice(realtimetransciption.length - 1, 1, <div  key= {realtimetransciption.length - 1} style={{backgroundColor:"#78e08f", padding:"10px", borderRadius:"25px", maxWidth:"50%", whiteSpace:"normal",float:"right"}}>{data['data']}</div>)
                            // }
                            realtimetransciption.splice(realtimetransciption.length - 1, 1, data['data'])
                        }
                        else
                        {
                            // if(data["fromCustomer"] === "false")
                            // {
                            //     realtimetransciption.splice(realtimetransciption.length - 1, 1, <div  key= {realtimetransciption.length - 1} style={{backgroundColor:"#82ccdd", padding:"10px", borderRadius:"25px", maxWidth:"50%", whiteSpace:"normal",float:"left"}}>{data['data']}</div>)
                            // }
                            // else if(data["fromCustomer"] === "true")
                            // {
                            //     realtimetransciption.splice(realtimetransciption.length - 1, 1, <div  key= {realtimetransciption.length - 1} style={{backgroundColor:"#78e08f", padding:"10px", borderRadius:"25px", maxWidth:"50%", whiteSpace:"normal",float:"right"}}>{data['data']}</div>)
                            // }
                            realtimetransciption.splice(realtimetransciption.length - 1, 1, data['data'])
                            realtimetransciption.push("")
                        }
                        calls[callIndex] = {...call, realtimetransciption}
                        return {calls}
                    // }
                    // else if(data["fromCustomer"] === "false")
                    // {
                    //     const callIndex = prevState.calls.findIndex(call => call.contactId === data["contactId"])
                    //     let calls = [...prevState.calls]
                    //     const call = {...calls[callIndex]}
                    //     let agent = [...call['agent']]
                    //     if(data["isPartial"] === "true")
                    //     {
                    //         agent.splice(agent.length - 1, 1, data['data'])
                    //     }
                    //     else
                    //     {
                    //         agent.splice(agent.length - 1, 1, data['data'])
                    //         agent.push("")
                    //     }
                    //     calls[callIndex] = {...call, agent}
                    //     return {calls}
                    // }
                    
                })   
            }
            else if(data["type"] === "confirm")
            {
                this.setState(prevState => {
                    // let ph = data["phoneNumber"]
                    // ph = "+" + ph.slice(-12)
                    const callIndex = prevState.calls.findIndex(call => call.contactId === data["contactId"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, confirm: true}
                    return {calls}
                    
                })   
            }
            else if(data["type"] === "notify")
            {
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.contactId === data["contactId"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, notif: true}
                    return {calls}
                    
                })  
            }
            else if(data["type"] === "offer")
            {
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.contactId === data["contactId"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, offer: true}
                    return {calls}
                    
                })  
            }
            else if(data["type"] === "voicemailstart")
            {
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.contactId === data["contactId"])
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
                    const callIndex = prevState.calls.findIndex(call => call.contactId === data["contactId"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, voicemail: "done"}
                    return {calls}
                    
                })  
            }
            else if(data["type"] === "transcribestart")
            {
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.contactId === data["contactId"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, transciption: true}
                    return {calls}
                    
                })  
            }
            else if(data["type"] === "transcribefinish")
            {
               // console.log(data['data'])
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.contactId === data["contactId"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, transciption: data["data"]}
                    return {calls}
                    
                })  
            }
            else if(data["type"] === "comprehendstart")
            {
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.contactId === data["contactId"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, comprehend: true}
                    return {calls}
                    
                })  
            }
            else if(data["type"] === "comprehendfinish")
            {
                //console.log(data['data'])
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.contactId === data["contactId"])
                    const calls = [...prevState.calls]
                    const call = {...calls[callIndex]}
                    
                    calls[callIndex] = {...call, comprehend: data["data"]}
                    return {calls}
                    
                })  
            }
            else if(data["type"] === "calldisconnected")
            {
                this.setState(prevState => {
                    const callIndex = prevState.calls.findIndex(call => call.contactId === data["contactId"])
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
        if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
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
            //let text = ""
            let text = []
            // let text = ""
            let customer;
            let agentdata = "", custdata = ""
            item.realtimetransciption.map((x, index) => {
                // text = {text + " " + x };
                if(x === "Customer: ")
                {
                    customer = true;
                    agentdata = ""
                    custdata = ""
                    text.push("")
                    //text.push(<span key={index} style={{color: "green"}}><br></br><b>{x}</b><br></br></span>)
                }
                else if(x === "Agent: ")
                {
                    customer = false;
                    agentdata = ""
                    custdata = ""
                    text.push("")
                    //text.push(<span key={index} style={{color: "red"}}><br></br><b>{x}</b><br></br></span>)
                }
                else
                {
                    if(customer === true)
                    {
                        custdata = custdata + " " + x;
                        text.splice(text.length - 1, 1, <div key= {index} className="msg_cotainer_lex">{custdata}</div>)
                        //text.push(<span key={index}><b>{x}</b></span>)
                    }
                    else if(customer == false)
                    {
                        agentdata = agentdata + " " + x;
                        text.splice(text.length - 1, 1, <div key= {index} className="msg_cotainer_user">{agentdata}</div>)
                        // text.push(<span key={index}><b>{x}</b></span>)
                    }
                }
                    // text.push(<span key={index}><b>{x}</b></span>)
            });
            // let text2 = ""
            // item.agent.map(x => {
            //     text2 = text2 + " " + x;
            // });
            // console.log("texT" + text)
             return <TableData key={item["contactId"]} callsconnected={item["phoneNumber"]} realtimetransciption={text} voicemail={item["voicemail"]} transciption={item["transciption"]} comprehend={item["comprehend"]} notif={item["notif"]} offer={item["offer"]} confirm={item["confirm"]} calldisconnected={item["disconnected"]}></TableData>
            })
       // console.log(data)
        return (
            <div class="container-fluid">
                  
                    <table class="table table-bordered">
                    <thead>
                        <tr>
                        <th style={{width: "5%", verticalAlign: "middle", textAlign: "center"}}>Number</th>
                        {/* <th style={{width: "35%"}}>Agent</th> */}
                        <th style={{width: "60%", verticalAlign: "middle", textAlign: "center"}}>Real-time transcript</th>
                        <th style={{width: "2%", verticalAlign: "middle", textAlign: "center"}}>Voicemail</th>
                        <th style={{width: "12.5%", verticalAlign: "middle", textAlign: "center"}}>Transciption of voicemail</th>
                        <th style={{width: "12.5%", verticalAlign: "middle", textAlign: "center"}}>Comprehend output</th>
                        <th style={{width: '2%', verticalAlign: "middle", textAlign: "center"}}>Notification email</th>
                        <th style={{width: "2%", verticalAlign: "middle", textAlign: "center"}}>Offer email</th>
                        <th style={{width: "2%", verticalAlign: "middle", textAlign: "center"}}>Confirmation email</th>
                        <th style={{width: "2%", verticalAlign: "middle", textAlign: "center"}}>Call Disconnected</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                    </table>
                </div>
        );
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

