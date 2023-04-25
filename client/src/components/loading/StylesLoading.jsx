import styled from 'styled-components'

export const ComponentContainer = styled.div `
.loading-dot-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 800px;
  width: 300px;
}

.loading-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 8px;
  background-color: #35bcbf;
  animation: loading-dot-animation 1s ease-in-out infinite;
}

.loading-dot:nth-child(1) {
  animation-delay: 0s;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loading-dot-animation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
`