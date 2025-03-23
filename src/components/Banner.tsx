import { FaRegLightbulb, FaBullseye, FaRegClock } from 'react-icons/fa6';

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner-grid container">
        <div className="banner-item">
          <FaRegLightbulb className="icon-banner" />
          <h3>Bright Ideas, Precise Choices, Timely Deals</h3>
        </div>
        <div className="banner-item">
          <FaBullseye className="icon-banner" />
          <h3>Innovation, Focus, and Speed: Get It All Here!</h3>
        </div>
        <div className="banner-item">
          <FaRegClock className="icon-banner" />
          <h3>Smart Tech, Targeted Solutions, Just in Time!</h3>
        </div>
      </div>
    </section>
  );
};

export default Banner;
