import React from 'react'
import { capitalizeFirstLetter } from '../utils/helpers';

export default function JobCard(props) {
    const {details} = props;
    const {companyName, logoUrl, jobRole, location, maxJdSalary, minJdSalary, salaryCurrencyCode, jobDetailsFromCompany, minExp, jdLink} = details;

    const goToJob = () => {
        window.open(jdLink);
    }
  return (
    <div className='job-card'>
        <div className="job-card-header">
            <img src={logoUrl} alt="Dropbox Logo"/>
            <div>
                <div className="company-name">
                    {companyName}
                </div>
                <div className='heading'>{capitalizeFirstLetter(jobRole)} Engineer</div>
                <p className="cards-sub-text">{capitalizeFirstLetter(location)}</p>
            </div>
        </div>
        <div className="card-salary">
            Estimated Salary: {salaryCurrencyCode} {minJdSalary|| 0} - {maxJdSalary}LPA ✅
        </div>
        <div className="about-company">
            About Company:
        </div>
        <p><strong>About us</strong></p>
        <p className="font-wt-400 mask-image">
            {jobDetailsFromCompany}
        </p>
        <div className="view-job" onClick={goToJob}>View job</div>
        <div className="job-card-footer" style={{marginTop: minExp ? '20px' : '60px'}}>
            {minExp ? <div><div className="min-exp">Minimum Experience</div>
            <div className='heading'>{minExp} {minExp > 1 ? 'years' : 'year'}</div></div> : null}
            <button className='easy-apple-button'> ⚡Easy Apply</button>
            <button className='unlock-referral-btn'>
                <img src='https://weekday-logos-and-images.s3.eu-north-1.amazonaws.com/Mask+Group.png' alt='img1'/>
                <img src='https://weekday-logos-and-images.s3.eu-north-1.amazonaws.com/Mask+Group(1).png' alt='img2'/> 
                ⚡Unlock referral asks
            </button>
        </div>
    </div>
  )
}
