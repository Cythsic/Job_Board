import React, { useEffect, useState } from 'react';
import '../../App.css';
import JobCard from '../jobDisplay/jobCard.js';
import Pagination from '../jobDisplay/Pagination';
import axios from 'axios';
import helper from '../../helper';


export default function Favorites(props) {
  const [idList, setIdList] = useState({
    ids: []
  });

  const [jobList, setJobList] = useState([]);

  const [isVisit, setVisit] = useState({
    whoIsLoggedIn: false,
    findFavorite: false,
  });

  const [userLog, setUserLog] = useState({
    user: '',
    isLog: false
  })

  useEffect(() => {
    axios.get('/api/users/whoIsLoggedIn')
      .then(response => {
        console.log("api request")
        // alert(response.request.responseURL)
        if (response.data !== '') {
          setJobList([]);
          setUserLog({
            ...userLog,
            user: response.data,
            isLog: true
          });
          var idUrl = 'api/users/findFavorite/' + response.data;
          axios.get(idUrl)
            .then(response => {
              console.log(response.data)
              response.data.map(jobid => {
                console.log(jobid)
                var jobUrl = 'api/jobs/findId/' + jobid;
                axios.get(jobUrl)
                  .then(response => {
                    setJobList([...jobList, response.data])
                  })
                  .catch(error => {
                    console.log(error);
                  })
              })
            })
            .catch(error => {
              console.log(error)
            });
        }
      })
      .catch(error => {
        console.log(error)
        // alert("register fail")
      });

  }, []);

  return <div>
    <div className="searchResult">
      <h3>Your Favorites</h3>
      <div className='jobcard'>
        {jobList.map((item, index) => {
          console.log("fav",item[0])
          var card = item[0];
          return (
            <li key={index}>
              <JobCard jobInfo={card} />
            </li>
          );

        })}
      </div>
    </div>
    <Pagination />
  </div>

}
// }
