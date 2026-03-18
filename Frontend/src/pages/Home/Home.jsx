import React from 'react'
import Hero from '../../components/Home/Hero'
import Features from '../../components/Home/Features'
import Working from '../../components/Home/Working'
import Last from '../../components/Home/Last'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

export default function Home() {
  return (
    <div>
        <Navbar type={"landing"}/>
      <Hero/>
      <Features/>
      <Working/>
      <Last/>
      <Footer/>
    </div>
  )
}
