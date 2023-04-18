import React from 'react';
import Link from 'next/link';


export const Sidebar = () => {
  return (
    <div className=''>
        <div className="px-4">
            <ul className="flex flex-col">
                <li className="py-8">
                    <Link href="/products">Products</Link>
                </li>
                <li className="py-8">
                    <Link href="/users">Users</Link>
                </li>
                <li className="py-8">
                    <Link href="/categories">Categories</Link>
                </li>
            </ul>
        </div>
    </div>
  )
}
