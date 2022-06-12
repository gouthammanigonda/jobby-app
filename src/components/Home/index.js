import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  const a = 0
  return (
    <div className="bg-container-home">
      <Header />
      <div className="home">
        <div className="home-container">
          <div className="home-content">
            <h1 className="content-main-heading">
              Find The Job That Fits Your Life
            </h1>
            <p className="content-para">
              Millions of people searching for jobs, salary, information,
              company reviews. Find the job that fits your ability and
              potential.
            </p>
            <Link to="/jobs">
              <button className="form-button content-btn">Find Job</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
