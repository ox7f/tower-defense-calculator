import { FC } from 'react';
import { Showcase } from '../components/common';

const items = [
  {
    title: 'Hello Player',
    description: (
      <>
        Here you'll find an easy-to-use calculator that is designed to make experimenting with different teams easy and
        accessible.
        <br />
        <br />
        Our user-friendly calculator allows you to enter your unit's stats and instantly receive accurate results based
        on your selections. With our user-friendly interface and powerful algorithms, finding the perfect team is just a
        few clicks away!
      </>
    )
  },
  {
    title: 'Changelog',
    description: (
      <>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </>
    )
  }
];

export const HomePage: FC = () => {
  return (
    <main>
      <div
        className="hero fullscreen hero-img parallax-img"
        style={{
          opacity: 0.15,
          backgroundColor: 'rgb(229, 229, 247)',
          backgroundImage: 'linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, white 1px)',
          backgroundSize: '50px 50px, 50px 50px, 10px 10px, 10px 10px',
          backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px'
        }}
      />

      <div className="u-absolute u-z-0 hero fullscreen hero-img parallax-img">
        <div className="hero-body animated fadeIn">
          <div className="content u-text-center">
            <Showcase items={items} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
