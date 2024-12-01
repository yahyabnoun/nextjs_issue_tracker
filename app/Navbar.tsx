'use client'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Skeleton, Text } from '@radix-ui/themes'
import { SketchLogoIcon } from '@radix-ui/react-icons'

const Navbar = () => {


  return (
    <nav className='border-b mb-5 px-5 py-3 items-center font-medium'>
      <Container>
        <Flex justify='between'>
          <NavLinks />
          <AuthStatus />


        </Flex>
      </Container>
    </nav>
  )
}



const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width='3rem' height='20px'/>

  if (status === "unauthenticated") return <Link href="/api/auth/signin">Login</Link>


  return (
    <>
      <Box>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar src={session!.user!.image!}
              fallback='?'
              size='2'
              radius='full'
              className='cursor-pointer'
              referrerPolicy='no-referrer'
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size='2'>
                {session!.user!.name}
              </Text>
            </DropdownMenu.Label>
            <DropdownMenu.Label>
              <Text size='2'>
                {session!.user!.email}
              </Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href='/api/auth/signout'>Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

      </Box>
    </>
  )
}



const NavLinks = () => {

  const currentPath = usePathname();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]


  return (
    <Flex align='center' gap='3' >
      <Link href={"/"}> <AiFillBug /> </Link>
      <ul className='flex space-x-6'>
        {links.map((link, key) =>
          <li key={key}><Link className={classnames({
            'nav-link': true,
            '!text-zinc-900': link.href === currentPath,
          })}
            href={link.href}>
            {link.label}</Link></li>
        )}
      </ul>
    </Flex>
  )
}



export default Navbar