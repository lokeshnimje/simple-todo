import React, { ReactElement, useState } from 'react'

type Tip ={
  text: string,
  children: ReactElement,
}
function Tooltip({text, children}: Tip) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div
    className='tooltip-container'
    onMouseEnter={() => setIsVisible(true)}
    onMouseLeave={() => setIsVisible(false)}>
        {children}
        {isVisible && <div className='tooltip'>{text}</div>}
    </div>
  )
}

export default Tooltip