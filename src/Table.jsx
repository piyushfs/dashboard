import React from 'react';
//import WebSocket from 'ws';
 
class TableData extends React.Component {

    render(){
        //console.log("props")
        //console.log(this.props)
        let confirm = ""
        if(this.props.confirm === true)
        {
            confirm = <i class="fa fa-check-circle fa-2x" aria-hidden="true"></i>
        };
        let calldisconnected = ""
        if(this.props.calldisconnected === true)
        {
            calldisconnected = <i class="fa fa-check-circle fa-2x" aria-hidden="true"></i>
        };
        let offer = ""
        if(this.props.offer === true)
        {
            offer = <i class="fa fa-check-circle fa-2x" aria-hidden="true"></i>
        };
        let notif = ""
        if(this.props.notif === true)
        {
            notif = <i class="fa fa-check-circle fa-2x" aria-hidden="true"></i>
        };
        let comprehend = ""
        if(this.props.comprehend === true)
        {
            comprehend = <div class="spinner-border"></div>
        }
        else if(this.props.comprehend !== false)
        {
            comprehend = <h4>{this.props.comprehend}</h4>
        }
        let transciption = ""
        if(this.props.transciption === true)
        {
            transciption = <div class="spinner-border"></div>
        }
        else if(this.props.transciption !== false)
        {
            transciption = <h4>{this.props.transciption}</h4>
        }
        let voicemail = ""
        if(this.props.voicemail === true)
        {
            voicemail = <div class="spinner-border"></div>
        }
        else if(this.props.voicemail === "done")
        {
            voicemail = <i class="fa fa-check-circle fa-2x" aria-hidden="true"></i>
        }
        // let realtimetransciption = ""
        // realtimetransciption = {}
        let callsconnected = ""
        callsconnected = <h4>{this.props.callsconnected}</h4>
        // let agent = ""
        // agent = <h4>{this.props.agent}</h4>

        return (
              <tr>
                <td>{callsconnected}</td>
                {/* <td>{agent}</td> */}
                <td>{this.props.realtimetransciption}</td>
                <td>{voicemail}</td>
                <td>{transciption}</td>
                <td>{comprehend}</td>
                <td>{notif}</td>
                <td>{offer}</td>
                <td>{confirm}</td>
                <td>{calldisconnected}</td>
              </tr>
               );
    }
}

export default TableData;
