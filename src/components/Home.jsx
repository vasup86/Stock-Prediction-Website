import Search from './Search';
import '../css/home.css';

export default function Home() {
  return (
    <>
      <div className="home-main">
        <div className="title">Stock Predictor</div>
        <div>
          <Search />
        </div>
      </div>
      <div className="footer">
        <span>Disclaimer: Website for Education Purpose Only</span>
      </div>
    </>
  );
}
