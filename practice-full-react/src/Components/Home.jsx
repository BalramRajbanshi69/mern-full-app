import React from 'react';
import MainHome from './MainHome'
import Profile from './Profile'
import Services from './Services'
import Contact from './Contact'
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <MainHome />
      <Profile showAddButton= {false} />
      <Services />
      <Contact />
      <Footer />
      
    </div>
  )
}

export default Home