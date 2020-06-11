import React from 'react'

const RightSidebar = ({ scores }) => {
  scores.sort((a, b) => {
    return a - b
  })
  const formattedScores = scores.map(
    (score) => `${score.slice(0, 2)}:${score.slice(2, 4)}`
  )
  return (
    <div className='right-sidebar'>
      <h2 className='right-sidebar__title'>Time records ⏱</h2>
      {formattedScores.map((score, i) => {
        if (i === 0)
          return (
            <p key={i} className='right-sidebar__item'>
              🥇 {score}
            </p>
          )
        if (i === 1)
          return (
            <p key={i} className='right-sidebar__item'>
              🥈 {score}
            </p>
          )
        if (i === 2)
          return (
            <p key={i} className='right-sidebar__item'>
              🥉 {score}
            </p>
          )
      })}
    </div>
  )
}

export default RightSidebar
