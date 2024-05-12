import { useEffect, useState } from 'react';
import './App.css';
import Filters from './components/Filters';
import JobListing from './components/JobListing';

function App() {

  const [data, setData] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [filters, setFilters] = useState({roles: [], employees: [], exp: '', modes: [], techStack: [], salary: [], companyName: ''})

  useEffect(()=>{
    fetchData();
  },[]);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
  "limit": 10,
  "offset": 0
  });

  const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body
  };

  async function fetchData() {
    try {
      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
      console.log('response: ', response);
      const result = await response.json();
      if(result?.jdList){
        setData(result.jdList);
        setTotalJobs(result.totalCount);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="App">
      <Filters filters={filters} setFilters={setFilters}/>
      <JobListing data={data} totalJobs={totalJobs}/>
    </div>
  );
}

export default App;
