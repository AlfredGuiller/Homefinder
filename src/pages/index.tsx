import Footer from './Footer';
import React, { useState } from 'react';
import Property from './property';
import About from './About';
import Letter from './letter';
import Header from './header';


export default function Home() {


  return (
  <div>

<Header />
<Letter/>
<Property/>
<About/>
<Footer/>  
</div>
  );
}