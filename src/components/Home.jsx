import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Search from './Search';
import '../css/home.css';

export default function Home() {
  return (
    <>
      <div className="home-main">
        <div className="title">Stock Predictor</div>
        <div>
          <Search searchWidth="30em" />
        </div>
      </div>
      <div className="footer">
        <span>Disclaimer: Website for Education Purpose Only</span>
        <div>
          <a href="https://github.com/vasup86/Stock-Prediction-Website" target="_blank" rel="noopener noreferrer">
            GitHub Repository
            <OpenInNewIcon
              sx={{
                color: '#c7c8ca',
                margin: 0,
                padding: 0,
                height: '18px',
              }}
            />
          </a>
        </div>
      </div>
    </>
  );
}
