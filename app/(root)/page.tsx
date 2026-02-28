import { sampleBooks } from '@/lib/constants'
import BookCard from '@/components/BookCard'
import HeroSection from '@/components/HeroSection'

export default function Page() {
  return (
    <main className="wrapper container">
      <HeroSection />
      <div className='library-books-grid'>
        {sampleBooks.map((book) => {
          return(
            <BookCard key={book._id} author={book.author} title={book.title} slug={book.slug} coverURL={book.coverURL} coverColor={book.coverColor} />
          )
        })}
      </div>
    </main>
  )
}