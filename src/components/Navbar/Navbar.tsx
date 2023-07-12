import SearchIcon from '../../assets/img/search.svg'
import HamburguerIcon from '../../assets/img/hamburger.svg'

export const Navbar = () => {
  return (
    <>
      <nav className="nav" role="navigation">
        <div className="max-centered">
          <h1 className="nav__logo">Rule of thumb.</h1>
          <button className="nav__hamburger icon-button" >
            <img src={HamburguerIcon} alt="Search icon" />
          </button>
          <ul className="nav__links">
            <li>
              <a href="#">Past Trials</a>
            </li>
            <li>
              <a href="#">How It Works</a>
            </li>
            <li>
              <a href="#">Login / Sign Up</a>
            </li>
            <li>
              <button className="nav__search icon-button">
                <img src={SearchIcon} alt="search" />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
