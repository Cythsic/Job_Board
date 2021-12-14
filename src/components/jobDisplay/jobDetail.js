import React, { Component, useEffect, useState } from "react";
import './jobDetail.css';
import jsonData from './testdata.json';
import { Link } from "react-router-dom";
import axios from "axios";

export default function JobDetail() {
    const currurl = window.location.pathname;
    const path = currurl.split('/');
    const id = path[path.length - 1];
    console.log("location:", path)

    const [jobData, setJob] = useState({
        datas: []
    });

    const [userLog, setLog] = useState('');
    const [allFavorites, setAllFavorites] = useState([]);
    const [isFav, setFav] = useState(false);


    useEffect(() => {
        var url = '/api/jobs/findId/' + id;
        axios.get(url)
            .then(response => {
                setJob({
                    ...jobData,
                    datas: response.data[0]
                })
                console.log(response.data[0])
            })
            .catch(error => {
                console.log(error)
            });

        axios.get('/api/users/whoIsLoggedIn')
            .then(response => {
                if (response.data !== '') {
                    setLog(response.data);
                    console.log(response.data + "!!!")
                axios.get('/api/users/findFavorite/' + response.data)
                    .then(response => {
                        setAllFavorites(response.data)
                        console.log(response.data)
                        response.data.some(jobid => {
                            if (jobid === id) {
                                setFav(true);
                                return true
                            }
                        })
                    })
                    .catch(error => console.error(error));
                }
                
            })
            .catch(error => {
                console.log(error)
            });

            

    }, []);
   
    const handleFavorite = () => {
        if (isFav === true) {
            var url = '/api/users/unfavorite';
        }
        else {
            var url = '/api/users/favorite';
        }
        axios.put(url,{
            id:id
        })
            .then(response => {
                setFav(!isFav);
                console.log(response)
            })
            .catch(error => console.error(error));
    }

    const handleDelete=() => {
        var url = '/api/jobs/delete/' + id;
        axios.delete(url)
            .then(response => {
                window.location.href = '/';
                console.log(response)
            })
            .catch(error => console.error(error));
    }


    return <div>
        <div className="outer">
            <div className="inner">
                {/* <form> */}
                <div className="mb-3 row">
                    {/* <label for="staticTitle" className="col-sm-12 col-form-label">Job Title:  {jobData.datas.job}</label> */}
                    <label for="staticTitle" className="col-sm-12 col-form-label">Job Title:  {userLog}</label>

                </div>
                <div className="mb-3 row">
                    <label for="staticCompany" className="col-sm-12 col-form-label">Company:  {jobData.datas.company}</label>
                </div>
                <div className="mb-3 row">
                    <label for="staticLocation" className="col-sm-12 col-form-label">Location:  {jobData.datas.location}</label>
                </div>
                {/* <div className="mb-3 row">
                            <label for="staticDate" className="col-sm-12 col-form-label">Post Date:  {jsonData.date}</label>
                        </div> */}
                <div className="mb-3 row">
                    <label for="staticDescription" className="col-sm-12 col-form-label">Description:  {jobData.datas.description}</label>
                </div>
                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-12 col-form-label">Contact Email:  {jobData.datas.email}</label>
                </div>
                <div className="mb-3 row">
                    <label for="staticWeb" className="col-sm-12 col-form-label">Webpage:  {jobData.datas.website}</label>
                </div>
                <div className="mb-3">
                    <div className="col-sm-offset-2 col-sm-2">
                        <button type="button" className={isFav===true?"btn btn-secondary btn-lg" : "btn btn-danger btn-lg"} onClick={handleFavorite}>{isFav===true?"Unfavorite" :"Favorite"} </button>
                    </div>
                    <div className="col-sm-offset-2 col-sm-2">
                        <button type="button" className="btn btn-info btn-lg" >Edit</button>
                    </div>
                    <div className="col-sm-offset-2 col-sm-2">
                        <button type="button" className="btn btn-info btn-lg" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                {/* </form> */}
            </div>
        </div >
    </div>

}