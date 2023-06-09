import { useEffect } from 'react';
import { HomePage, DetailPage, LandingPage, Navbar } from './components'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getGenres } from './redux/actions';


function App() {

  const { pathname } = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  return (
    <>
      {
        pathname !== '/'
          ? <div className='navbar'>
            <Navbar />
          </div>
          : ''
      }

      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route exact path='api/videogames/:id' element={<DetailPage />} />
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;