import { Card } from '../card/Card'
import { CardsComponent } from './StylesCards'

export const Cards = ({ videogames }) => {
  return (
    <CardsComponent>
      {
        videogames.map(g => <Card videogame={g} key={g.id} />)
      }
    </CardsComponent>
  )
}
