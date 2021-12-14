import React, { Component } from "react";
import './jobCard.css';

export default class JobCard extends Component {
    constructor(props){
        super(props);
        console.log("JOBCARD:",this.props.jobInfo.job)
    }
    
    render() {
        const detailUrl = '/detail/' + this.props.jobInfo._id;
        // console.log(detailUrl)
        return (
            <div className="card">
                {/* <img src="..." class="card-img-top" alt="..."> */}
                <div className ="card-body">
                <h5 className ="card-title">Job Title: {this.props.jobInfo.job}</h5>
                {/* <h5 className ="card-title">!!!!!!</h5> */}

                {/* <p className ="card-text">Url: {detailUrl}</p> */}
                <p className ="card-text">Company: {this.props.jobInfo.company}</p>
                <p className ="card-text">Location: {this.props.jobInfo.location}</p>
                <a href={detailUrl} className ="btn btn-primary">Details</a>
                </div>
            </div>
        );
    }
}
