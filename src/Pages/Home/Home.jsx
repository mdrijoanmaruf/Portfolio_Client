import React from 'react';
import Intro from './Intro/Intro';
import AboutMe from './AboutMe';
import Education from './Education';
import ContactMe from './ContactMe';

const Home = () => {
  return (
    <div>
      <section id="home">
        <Intro />
      </section>
      <section id="about">
        <AboutMe />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="contact">
        <ContactMe />
      </section>
    </div>
  );
};

export default Home;