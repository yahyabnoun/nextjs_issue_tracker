'use client'
import Link from 'next/link'
import { AiFillBug } from 'react-icons/ai'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]

  return (
    <nav className='border-b mb-5 px-5 py-3 items-center font-medium'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3' >
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
          </Flex>

          <Box>
            {status == "authenticated" ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar src={session.user!.image!}
                    fallback='?'
                    size='2'
                    radius='full'
                    className='cursor-pointer'
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size='2'>
                      {session.user!.name}
                    </Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Label>
                    <Text size='2'>
                      {session.user!.email}
                    </Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href='/api/auth/signout'>Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            ) : (
              <Link href="/api/auth/signin">Sign in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default Navbar