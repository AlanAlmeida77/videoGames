import React from 'react'
import { NavLink } from 'react-router-dom'
import { HomePage } from '../homepage/HomePage'
import { SearchBar } from '../search/SearchBar'
import { ComponentContainer } from './StylesNavbar'

export const Navbar = () => {
  return (
    <ComponentContainer>
      <div className='buttonsContainer'>
        <NavLink className='button' to='/home' element={<HomePage />}><p><i className='sh-home'></i></p></NavLink>
      </div>
      <div className='searchBar'>
        <SearchBar />
      </div>
    </ComponentContainer>
  )
}
