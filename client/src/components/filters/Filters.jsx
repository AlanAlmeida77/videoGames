import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByGenre, filterBySource, filters, sort } from '../../redux/actions'
import { FiltersComponent, DivFilter, ButtonDiv } from './StylesFilters'

export const Filters = () => {

  const dispatch = useDispatch()
  const { genres } = useSelector(state => state)

  const [filter, setFilter] = useState({
    genre: 'none',
    source: 'none',
  })
  const [order, setOrder] = useState('none')

  const handleFilters = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    })
  }
  const handleOrder = (e) => {
    setOrder(e.target.value)
  }

  const onFilterClick = (e) => {
    e.preventDefault()
    if (filter.source === 'none') {
      dispatch(filterBySource(filter.source))
      dispatch(filterByGenre(filter.genre))
    } else if (filter.genre === 'none') {
      dispatch(filterByGenre(filter.genre))
      dispatch(filterBySource(filter.source))
    } else if (filter.genre !== 'none' && filter.source !== 'none') {
      dispatch(filterBySource(filter.source))
      dispatch(filterByGenre(filter.genre))
    }
  }
  const onOrderClick = (e) => {
    e.preventDefault()
    dispatch(sort(order))
  }

  return (
    <FiltersComponent>
      <DivFilter>
        <div>
          <h4>Filter by Genre</h4>
        </div>
        <div>
          <select name="genre" id="genreFilter" onChange={handleFilters}>
            <option value="none">None</option>
            <option value="action">Action</option>
            <option value="indie">Indie</option>
            <option value="adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="strategy">Strategy</option>
            <option value="shooter">Shooter</option>
            <option value="casual">Casual</option>
            <option value="simulation">Simulation</option>
            <option value="puzzle">Puzzle</option>
            <option value="arcade">Arcade</option>
            <option value="platformer">Platformer</option>
            <option value="racing">Racing</option>
            <option value="massively multiplayer">Massively Multiplayer</option>
            <option value="sports">Sports</option>
            <option value="fighting">Fighting</option>
            <option value="family">Family</option>
            <option value="board games">Board Games</option>
            <option value="educational">Educational</option>
            <option value="card">Card</option>
          </select>
        </div>
      </DivFilter>
      <ButtonDiv>
        <button onClick={onFilterClick}>Filter</button>
      </ButtonDiv>
      <DivFilter>
        <div>
          <h4>Filter by Source</h4>
        </div>
        <div>
          <select name="source" id="dataTypeFilter" onChange={handleFilters}>
            <option value="none">None</option>
            <option value="api">Api</option>
            <option value="database">Database</option>
          </select>
        </div>
      </DivFilter>
      <ButtonDiv>
        <button onClick={onFilterClick}>Filter</button>
      </ButtonDiv>
      <DivFilter>
        <div>
          <h4>Sort by: </h4>
        </div>
        <div>
          <select name="sort" onChange={handleOrder}>
            <option value="none">None</option>
            <option value="ratingAsc">Rating - (0-5)</option>
            <option value="ratingDesc">Rating - (5-0)</option>
            <option value="nameAsc">Name - (a-z)</option>
            <option value="nameDesc">Name - (z-a)</option>
          </select>
        </div>
      </DivFilter>
      <ButtonDiv>
        <button onClick={onOrderClick}>Order</button>
      </ButtonDiv>
    </FiltersComponent>
  )
}
