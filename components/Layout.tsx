import React , {ReactNode} from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
interface MyProps {
    children: ReactNode
}
export const Layout = ({children} : MyProps): JSX.Element=> {
  return (
    <div className='bg-slate-300 h-screen'>
        <Header />
        <div className='flex h-5/6'>
            <div className='m-2 w-1/6 bg-slate-200 '><Sidebar /></div>
            <div className='m-2 w-5/6 bg-slate-200 p-4'>{children}</div>
            
        </div>
    </div>
  )
}
