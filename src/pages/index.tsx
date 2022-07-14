import SinglePlayer from './SinglePlayer';
const Home = () => <SinglePlayer />;

const Homez = () => (
  <div className='bg-slate-900 h-screen m-0 absolute'>
    <figure className="bg-slate-100 rounded-xl p-8 m-8 dark:bg-slate-800 text-gray-400">
      <div className="w-24 h-24 rounded-full mx-auto bg-slate-400" />
      <div className="pt-6 space-y-4">
        <blockquote>
          <p className="text-lg font-medium text-center p-8">
            “Tailwind CSS is the only framework that I've seen scale
            on large teams. It’s easy to customize, adapts to any design,
            and the build size is tiny.”
          </p>
        </blockquote>
        <figcaption className='text-gray-100 grid gap-2 grid-flow-col'>
          <div className='bg-slate-700 rounded p-2 text-center hover:bg-slate-600'>
            Sarah Dayan
          </div>
          <div className='bg-slate-700 rounded p-2 text-center hover:bg-slate-600'>
            Staff Engineer, Algolia
          </div>
        </figcaption>
      </div>
    </figure>
  </div>
  

);

export default Home;