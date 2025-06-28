import React from 'react';
import Intro from './Intro/Intro';
import AboutMe from './AboutMe/AboutMe';
import Education from './Education/Education';
import ContactMe from './ContactMe/ContactMe';
import FeaturedProject from './Featured/FeaturedProject';

const Home = () => {
  return (
    <div>
      <section id="home">
        <Intro />
      </section>
      <section id="about">
        <AboutMe />
      </section>
      <section>
        <FeaturedProject></FeaturedProject>
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