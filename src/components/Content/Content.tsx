import { Card } from '../Card/Card'
import { PersonData, displayView } from '../../helpers/types'
import { useEffect, useState } from 'react'
import { Select, SimpleGrid } from '@chakra-ui/react'
import { data } from '../../assets/data.json'

export const Content = () => {
  const [dataState, setDataState] = useState<PersonData[]>(JSON.parse(localStorage.getItem('data')!) || data)
  const [isListView, setIsListView] = useState<string>(displayView.LIST)
  const [width, setWidth] = useState<boolean>(false)
  const Cards = dataState.map((person: PersonData) => <Card key={person.name} {...person} dataState={dataState} setDataState={setDataState} isListView={isListView} />)

  const handleSelectChange = (e: any) => {
    setIsListView(e.target.value === displayView.LIST ? displayView.LIST : displayView.GRID)
  }

  console.log(width)
  console.log(isListView === displayView.LIST)

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth <= 768
      setWidth(isMobileDevice)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    width ? setIsListView(displayView.GRID) : setIsListView(displayView.LIST)
  }, [width])

  return (
    <>
      <div className="max-centered">
        <aside className="banner banner-top" role="doc-tip" aria-label="Speak Out">
          <div className="banner__left">
            <span className="banner__hairline">Speak out. Be heard.</span>
            <span className="banner__title">Be counted</span>
          </div>
          <div className="banner__right">
            <p className="banner__text">
              Rule of Thumb is a crowd sourced court of public opinion where anyone and everyone can speak out and speak freely. It’s easy: You share your opinion, we analyze and put the data in a public report.
            </p>
          </div>
          <button className="icon-button" aria-label="close">
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g stroke="#000" strokeWidth="2" fill="none" fillRule="evenodd"><path d="M1 19L19 1M1 1l18 18" /></g></svg>
          </button>
        </aside>
        <main role="main">
          👉 Your code goes here 👈
          <div className='main-subtitle'>
            <h2>Previous Rulings</h2>
            {
              !width && (<Select width={'50%'} value={isListView} onChange={handleSelectChange} >
                <option value='list'>List</option>
                <option value='grid'>Grid</option>
              </Select>)
            }
          </div>
          {
            (isListView === displayView.LIST)
              ? (Cards)
              : (<SimpleGrid minChildWidth={'500px'} spacing={'40px'}>
                {Cards}
              </SimpleGrid>)
          }
        </main>
        <aside className="banner banner-bottom" role="doc-tip" aria-label="Submit a name">
          <img
            srcSet="assets/img/bg-people.png 750w, assets/img/bg-people.@2x.png 1440w"
            sizes="(min-width: 750px) 1440px, 100vw"
            className="banner__background" src="assets/img/bg-people.png"
            alt=""
            role="none" />
          <div className="banner__left">
            <h2 className="banner__heading">Is there anyone else you would want us to add?</h2>
          </div>
          <div className="banner__right">
            <button className="banner__cta">
              Submit a name
            </button>
          </div>
        </aside>
        <hr role="separator" />
        <footer className="footer">
          <div className="footer__links">
            <ul>
              <li>
                <a href="#">Terms and Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="footer__social">
            <span>Follow us</span>
            <ul>
              <li>
                <a href="#">
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M24 1.325v21.35c0 .732-.593 1.325-1.325 1.325H16.56v-9.294h3.12l.467-3.622H16.56V8.771c0-1.048.292-1.763 1.796-1.763h1.918v-3.24a25.663 25.663 0 00-2.795-.143c-2.766 0-4.659 1.688-4.659 4.788v2.671H9.691v3.622h3.128V24H1.325A1.325 1.325 0 010 22.676V1.325A1.325 1.325 0 011.325 0h21.35A1.325 1.325 0 0124 1.325z" fill="#262626" fillRule="nonzero" /></svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg width="26" height="23" xmlns="http://www.w3.org/2000/svg"><path d="M23.329 6.204c.01.23.01.458.01.687A15.182 15.182 0 01-.008 19.688c.421.05.845.075 1.27.073a10.7 10.7 0 006.627-2.289 5.335 5.335 0 01-4.984-3.704c.798.151 1.62.12 2.404-.094a5.346 5.346 0 01-4.276-5.233v-.073a5.396 5.396 0 002.413.666 5.357 5.357 0 01-1.654-7.127A15.15 15.15 0 0012.79 7.484a5.898 5.898 0 01-.135-1.217 5.336 5.336 0 019.228-3.652 10.612 10.612 0 003.392-1.29 5.368 5.368 0 01-2.351 2.955 10.811 10.811 0 003.07-.843 10.868 10.868 0 01-2.664 2.767z" fill="#262626" fillRule="nonzero" /></svg>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  )
}
