import styled from 'styled-components'

export const ComponentContainer = styled.div`
  min-height: 90.4vh;
  background-color: #263849;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const PageSidebarAndMain = styled.div`
  display: flex;
  flex-direction: row;


  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`

export const MainComponent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 30px;

  .modalButton {
    position: fixed;
    bottom: 50px;
    right: 52.5px;
    z-index: 1;

    button {
      height: 50px;
      width: 80px;
      border-radius: 8px;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      cursor: pointer;
      background-color: #90f6d7;
      color: black;

      &:hover {
        background-color: #41506b;
        color: #dddddd;
      }

    }
  }
`

export const SidebarComponent = styled.div`
  color: #90f6d7;
  background-color: #90f6d7;
  min-width: 350px;
  height: 30rem;
  display: flex;
  border-radius: 10px;
  margin-left: 30px;

  @media (max-width: 1000px) {
    margin: 0 0 40px 0;    
  }
`