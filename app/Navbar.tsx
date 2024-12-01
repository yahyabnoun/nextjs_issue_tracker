'use client'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
 import { useSession } from 'next-auth/react'
import { Box } from '@radix-ui/themes'

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data : session }  = useSession();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center font-medium'>
      <Link href={"/"}> <AiFillBug /> </Link>
      <ul className='flex space-x-6'>
        {links.map((link, key) =>
          <li key={key}><Link className={classnames({
            'text-zinc-900': link.href === currentPath,
            'text-zinc-500': link.href !== currentPath,
            'hover:text-zinc-900 transition-colors': true
          })}
            href={link.href}>
            {link.label}</Link></li>
        )}
      </ul>
      <Box>
        {status == "authenticated" ? (
          <Link href="/api/auth/signout">Sign out</Link>
        ) : (
          <Link href="/api/auth/signin">Sign in</Link>
        )}
      </Box>
    </nav>
  )
}

export default Navbar