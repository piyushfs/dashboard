import React from 'react';
//import WebSocket from 'ws';
 
class TableData extends React.Component {

    render(){
        console.log("props")
        console.log(this.props)
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
        let realtimetransciption = ""
        realtimetransciption = <h4>{this.props.realtimetransciption}</h4>
        let callsconnected = ""
        callsconnected = <h4>{this.props.callsconnected}</h4>

        return <div class="container-fluid">
        <h2>Dashboard</h2>          
        <table class="table table-bordered">
          <thead>
            <tr>
              <th style={{width: "10%"}}>Number</th>
              <th style={{width: "40%"}}>Real-time transcript</th>
              <th style={{width: "5%"}}>Voicemail</th>
              <th style={{width: "12.5%"}}>Transciption of voicemail</th>
              <th style={{width: "12.5%"}}>Comprehend output</th>
              <th style={{width: '5%'}}>Notification email</th>
              <th style={{width: "5%"}}>Offer email</th>
              <th style={{width: "5%"}}>Confirmation email</th>
              <th style={{width: "5%"}}>Call Disconnected</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{callsconnected}</td>
                <td>{realtimetransciption}</td>
                <td>{voicemail}</td>
                <td>{transciption}</td>
                <td>{comprehend}</td>
                <td>{notif}</td>
                <td>{offer}</td>
                <td>{confirm}</td>
                <td>{calldisconnected}</td>
              </tr>
          </tbody>
        </table>
      </div>;      

    }
}

export default TableData;
