import Footer from './Footer';
import React, { useState } from 'react';
import Property from './property';
import About from './About';
import Letter from './letterland';
import Header from './headerlogin';


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