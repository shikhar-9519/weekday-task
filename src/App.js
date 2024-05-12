import { useEffect, useState } from 'react';
import './App.css';
import Filters from './components/Filters';
import JobListing from './components/JobListing';

function App() {

  const [data, setData] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [filters, setFilters] = useState({roles: [], exp: [], modes: [], salary: [], companyName: ''})
  const [page, setPage] = useState(0);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    loadMore();
  },[]);

  useEffect(()=>{
    const filteredData = data.filter(job => {
    const roleMatch = filters.roles.length === 0 || filters.roles.includes(job.jobRole.toLowerCase());
    const expMatch = (filters.exp.length === 0) || (job.minExp <= parseInt(filters.exp[0]));
    const salaryMatch = (filters.salary.length === 0) || (job.minJdSalary >= parseInt(filters.salary[0].split('L')));
    const companyNameMatch = (filters.companyName === '') || (job.companyName.toLowerCase().includes(filters.companyName.toLowerCase()));
    const locationMatch = (filters.modes.includes('remote') && job.location === 'remote') ||
    (filters.modes.includes('in-office') && job.location !== 'remote') ||
    (filters.modes.includes('hybrid') || filters.modes.length === 0); 
     return roleMatch && expMatch && salaryMatch && companyNameMatch && locationMatch;
    });
    setFilteredJobs(filteredData);
  },[data, filters])

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
  "limit": 10,
  "offset": page*10
  });

  const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body
  };

  async function loadMore() {
    const nextPage =  page + 1 ;
    const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
    const newData = await response.json();
    if (newData?.jdList?.length > 0) {
      setData(prevJobs => [...prevJobs, ...newData.jdList]);
      setPage(nextPage);
      setTotalJobs(newData.totalCount)
    }
  }

  return (
    <div className="App">
      <Filters filters={filters} setFilters={setFilters}/>
      {filteredJobs.length ? <JobListing data={filteredJobs} totalJobs={totalJobs} allJobs = {data}loadMore={loadMore}/> : null}
      {!filteredJobs.length ? <div className='justify-content-center mg-top-54'>!!! That's all. Please change filters to see all jobs !!!</div> : null}
    </div>
  );
}

export default App;
