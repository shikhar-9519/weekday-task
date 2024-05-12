import React, { useState } from 'react'
import Dropdown from './Dropdown'
import { EXP_OPTIONS, MODE_OPTIONS, ROLES_OPTIONS, SALARY_OPTIONS } from '../utils/CONSTANTS'

export default function Filters({filters, setFilters}) {

  const updateFilters = (items, key) => {
    setFilters({...filters, [key]: items})
  }

  return (
    <div className='filters-container'>
      <Dropdown data={ROLES_OPTIONS} placeholder={'Roles'} updateFilters={updateFilters} id={'roles'}/>
      <Dropdown data={EXP_OPTIONS} placeholder={'Experience'} updateFilters={updateFilters} id={'exp'} singleSelect/>
      <Dropdown data={MODE_OPTIONS} placeholder={'Office mode'} updateFilters={updateFilters} id={'modes'} singleSelect/>
      <Dropdown data={SALARY_OPTIONS} placeholder={'Min Base Pay'} updateFilters={updateFilters} id={'salary'} singleSelect/>
      <input value={filters.companyName} placeholder='Search Company Name' onChange={(e)=>setFilters({...filters, companyName: e.target.value})} className='search-company-input'/>
    </div>
  )
}
