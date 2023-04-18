import React from 'react'
import Link from 'next/link'

export const Header = () => {
  return (
    <div className='m-2 bg-slate-200'>
        <ul className="flex justify-between">
            <li>
                <Link href="/">RentME</Link>
            </li>
            
            <li>
                <Link href="/">Welcome</Link>
            </li>

        </ul>
    </div>
  )
}
