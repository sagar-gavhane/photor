import React, { SFC } from 'react'

const Header: SFC = () => {
  return (
    <div className="header">
      <img
        height="64"
        width="64"
        alt="unicorn"
        src="https://emojicdn.elk.sh/📸"
        loading="lazy"
      />
      <h1>photor</h1>
    </div>
  )
}

export default Header
