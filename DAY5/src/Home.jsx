
import NavBar from './NavBar';

const Home = () => {
  const backgroundImageUrl = 'https://www.cghearth.com/uploads/TourismImg/20170628060353AMSpiceCoastCruisesAboutSlider4.jpg';

  const containerStyle = {
    background: `url(${backgroundImageUrl}) center/cover no-repeat fixed`,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center', /* Added for horizontal centering */
    alignItems: 'center',
  };

  return (
    <div style={{ height: '100vh' }}>
      <div style={containerStyle}>
        <NavBar />
        
        {/* Add footer content if needed */}
      </div>
    </div>
  );
};

export default Home;
