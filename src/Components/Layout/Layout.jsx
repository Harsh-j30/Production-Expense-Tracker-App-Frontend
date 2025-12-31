import React, { } from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <>
      <div className="app-container">
        <Header />
        <div className="main-content">{children}</div>
        <Footer />
      </div>
    </>
  );
}

export default Layout
