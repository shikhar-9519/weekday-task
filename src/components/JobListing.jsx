import React, { useEffect, useState } from 'react'
import JobCard from './JobCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';

export default function JobListing(props) {
    const {data, totalJobs} = props;
    const [jobs, setJobs] = useState(data);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setJobs(data);
      }, [data]);

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
        const nextPage = page + 1;
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        const newData = await response.json();
        if (newData?.jdList?.length > 0) {
          setJobs(prevJobs => [...prevJobs, ...newData.jdList]);
          setPage(nextPage);
        } else {
          setHasMore(false);
        }
      }

  return (
    <InfiniteScroll
          dataLength={jobs.length}
          next={loadMore}
          hasMore={totalJobs !== jobs.length}
          loader={<Spinner/>}
        >
    <div className='job-listing'>
      {
        jobs.map((job) =>
            <JobCard details={job}/>
        )
      }
    </div>
    </InfiniteScroll>
  )
}
