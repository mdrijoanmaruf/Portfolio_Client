import React from 'react';
import Intro from './Intro/Intro';
import FeaturedProject from './Featured/FeaturedProject';

const Home = () => {
  return (
    <div>
      <section id="home">
        <Intro />
      </section>
      <section>
        <FeaturedProject></FeaturedProject>
      </section>
    </div>
  );
};

export default Home;