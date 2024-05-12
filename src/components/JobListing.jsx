import React, { useEffect, useState } from 'react'
import JobCard from './JobCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';

export default function JobListing(props) {
    const {data, totalJobs, loadMore, allJobs} = props;

  return (
    <InfiniteScroll
          dataLength={data.length}
          next={loadMore}
          hasMore={totalJobs !== allJobs.length}
          loader={<Spinner/>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
    <div className='job-listing'>
      {
        data.map((job) =>
            <JobCard details={job}/>
        )
      }
    </div>
    </InfiniteScroll>
  )
}
