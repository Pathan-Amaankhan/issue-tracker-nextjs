import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
        <Link href='/users'>GO TO Users Page!</Link>
        <div>
          <Link href='/products' className='btn'>Add to cart</Link>
        </div>
    </main>
  )
}
