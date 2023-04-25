import styled from 'styled-components'

export const ComponentContainer = styled.div`
  position: relative;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #41506b;

  .buttonsContainer {
    width: 25rem;
    display: flex;
    justify-content: center;
    gap: 5rem;

    .button {
      cursor: pointer;
      text-decoration: none;
      color: white;
      border: 3px solid transparent;

      &:hover {
        color: #35bcbf;
        border-bottom: 3px solid  #35bcbf;
      }
    }

    @media (max-width: 600px) {
      flex-direction: column;
      gap: 0;
      align-items: baseline;
      margin-left: 15px;
      width: 15rem;
    }
  }

  .searchBar {
    width: 40%;
    display: flex;
    justify-content: flex-end;
    margin-right: 50px;
  }

  .sh-home {
    background: #333;
    display: inline-block;
    height: 45px;
    margin: 65px 25px 0;
    position: relative;
    vertical-align: middle;
    width: 50px;
    left: -30px;
}
    .sh-home:before {
        border-bottom: solid 50px #333;
        border-left: solid transparent 40px;
        border-right: solid transparent 40px;
        content: "";
        left: -15px;
        position: absolute;
        top: -45px;
    }
    .sh-home:after {
        background: #41506b;
        bottom: 0;
        content: "";
        left: 15px;
        height: 25px;
        position: absolute;
        width: 20px;
    }
    .sh-home:hover:after {
        transition: all .2s ease;
        width: 0;
    }

`