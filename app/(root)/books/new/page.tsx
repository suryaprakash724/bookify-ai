
import UploadForm from '@/components/UploadForm'

const Page = () => {
  return (
    <main className='wrapper container'>
        <div className='mx-auto max-w-180 space-y-10'>
          <section className='flex flex-col gap-5'>
            <h1 className='page-title-xl'>Add a new book to your library</h1>
            <p className='subtitle'>Upload your book file and we'll convert it into an interactive AI conversation.</p>
          </section>
          <UploadForm />
        </div>
    </main>
  )
}

export default Page