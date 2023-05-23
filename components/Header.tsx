import Link from 'next/link'

export const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/challenge">Challenge</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
