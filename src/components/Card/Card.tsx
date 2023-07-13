import { CardProps, PersonData } from '../../helpers/types'
import ThumbsUp from '../../assets/img/thumbs-up.svg'
import ThumbsDown from '../../assets/img/thumbs-down.svg'
import './Card.css'

export const Card = ({ name, description, category, picture, lastUpdated, votes, dataState, setDataState }: CardProps) => {
  const positivePercentage = votes.positive / (votes.positive + votes.negative) * 100
  const negativePercentage = votes.negative / (votes.positive + votes.negative) * 100

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
    }
  }

  return (
    <>
      <p>{votes.positive}</p>
      <div className='card' style={{ width: '100%' }}>
        <div className='imageContainer'>
          <img src={picture} alt={`Image of ${name}`} />
        </div>
        <div className='Card card-info'>
          <h2 className="featured-card__title">{name} </h2>
          <p className="featured-card__desc">{description}</p>

        </div>
        <div>
          <span style={{ display: 'flex', justifyContent: 'flex-end', padding: '5px 15px' }}>
            {lastUpdated}
            {category}
          </span>
          <div className='card-actions' >
            <button className='action-button action__thumbUp' onClick={thumbsUpAction}><img src={ThumbsUp} alt="thumbs up" /></button>
            <button className='action-button action__thumbDown'><img src={ThumbsDown} alt="thumbs down" /></button>
            <button className='action__voteNow' >Vote now</button>
          </div>

        </div>

      </div>
      <div className='card-survey' style={{ background: `linear-gradient(to right, rgb(60, 187, 180) ${positivePercentage}%, rgb(249, 173, 29) ${negativePercentage}%)` }}>
        <span className='card-survey__percentage'>
          <img src={ThumbsUp} alt="Thumbs up" />
          <span>{positivePercentage.toFixed(1)}%</span>
        </span>
        <span className='card-survey__percentage'>
          <img src={ThumbsDown} alt="Thumbs down" />
          <span>{negativePercentage.toFixed(1)}%</span>
        </span>
      </div>
    </>
  )
}
