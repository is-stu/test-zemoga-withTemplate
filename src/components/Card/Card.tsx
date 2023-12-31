import { CardProps, PersonData, displayView } from '../../helpers/types'
import ThumbsUp from '../../assets/img/thumbs-up.svg'
import ThumbsDown from '../../assets/img/thumbs-down.svg'
import './Card.css'
import { useEffect, useState } from 'react'
import moment from 'moment'

export const Card = ({ name, description, category, picture, lastUpdated, votes, dataState, setDataState, isListView }: CardProps) => {
  const positivePercentage = votes.positive / (votes.positive + votes.negative) * 100
  const negativePercentage = votes.negative / (votes.positive + votes.negative) * 100
  const [alreadyVote, setAlreadyVote] = useState<string[]>([])

  useEffect(() => {
    localStorage.clear()
    localStorage.setItem('data', JSON.stringify(dataState))
  }, [dataState])

  const thumbsUpAction = () => {
    const person = dataState.find((person: PersonData) => person.name === name)
    if (person) {
      const position = dataState.indexOf(person)
      const newData = dataState.filter((person: PersonData) => person.name !== name)
      const newPerson = {
        ...person,
        votes: {
          positive: votes.positive + 1,
          negative: votes.negative
        }
      }
      newData.splice(position, 0, newPerson)
      setDataState([...newData])
      setAlreadyVote([...alreadyVote, name])
    }
  }

  const thumbsDownAction = () => {
    const person = dataState.find((person: PersonData) => person.name === name)
    if (person) {
      const position = dataState.indexOf(person)
      const newData = dataState.filter((person: PersonData) => person.name !== name)
      const newPerson = {
        ...person,
        votes: {
          positive: votes.positive,
          negative: votes.negative + 1
        }
      }
      newData.splice(position, 0, newPerson)
      setDataState([...newData])
      setAlreadyVote([...alreadyVote, name])
    }
  }

  const voteAgainAction = () => {
    const newVotes = alreadyVote.filter((person: string) => person !== name)
    setAlreadyVote([...newVotes])
  }

  return (
    <>
      <div>
        <div className={`card ${isListView === displayView.GRID && 'card-bg_image'}`} style={ isListView === displayView.GRID
          ? {
            backgroundImage: "url('" + picture + "')",
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }
          : {}}>
          {
            isListView === displayView.LIST && (<div className='imageContainer'>
              <img src={picture} alt={`Image of ${name}`} style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }} />
            </div>)
          }
          <div className='Card card-info'>
            <h2 className={`featured-card__title  ${isListView === displayView.GRID && 'grid-mode grid-mode__title'}`} style={{ padding: '10px 0 0 10px' }}>{name} </h2>
            <p className={`featured-card__desc ${isListView === displayView.GRID && 'grid-mode grid-mode__subtitle'}`} style={{ padding: '0 10px' }}>{description}</p>

          </div>
          <div>
            <span style={{ display: 'flex', justifyContent: 'flex-end', padding: '5px 15px' }}>
              {
                moment(lastUpdated).fromNow()
              }
              &nbsp;in&nbsp;
              {category}
            </span>
            {
              !alreadyVote.find((person: string) => person === name)
                ? (<><h3 className='info-text'>VOTE NOW !</h3>
                  <div className='card-actions' >
                    <button className='action-button action__thumbUp' onClick={thumbsUpAction}><img src={ThumbsUp} alt="thumbs up" /></button>
                    <button className='action-button action__thumbDown' onClick={thumbsDownAction}><img src={ThumbsDown} alt="thumbs down" /></button>
                  </div></>)
                : (
                  <>
                    <h3 className='info-text'>Want to vote again ?</h3>
                    <button className='action__voteAgain' onClick={voteAgainAction}>Click here !</button>
                  </>
                )
            }
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div className='card-survey' style={{ background: 'rgba(60, 187, 180,0.8)', width: `${positivePercentage}%` }}>
            <span className='card-survey__percentage'>
              <img src={ThumbsUp} alt="Thumbs up" />
              <span>{positivePercentage.toFixed(1)}%</span>
            </span>
          </div>
          <div className='card-survey' style={{ background: 'rgba(249, 173, 29,0.8)', width: `${negativePercentage}%` }}>
            <span className='card-survey__percentage'>
              <img src={ThumbsDown} alt="Thumbs down" />
              <span>{negativePercentage.toFixed(1)}%</span>
            </span>
          </div>
        </div>
      </div >
    </>
  )
}
