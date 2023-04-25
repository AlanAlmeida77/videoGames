import React from 'react'
import { ComponentContainer } from './StylesLoading'


export const Loading = () => {
  return (
    <ComponentContainer>
      <div className="loading-dot-container">
        <div className="loading-dot">.</div>
        <div className="loading-dot">.</div>
        <div className="loading-dot">.</div>
      </div>
    </ComponentContainer>
  )
}