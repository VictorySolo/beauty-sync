import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopSpecialists from '../components/TopSpecialists'
import Banner from '../components/Banner'


const Home = () => {
  return (
    <div>
        <Header/>
        <SpecialityMenu/>
        <TopSpecialists/>
        <Banner/>
    </div>
  )
}

export default Home