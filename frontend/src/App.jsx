import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4">
        PHOTO<span className="font-bold text-blue-500 ">SHOOT</span> STUDIO
      </h1>
      <p className="text-zinc-400 text-lg md:text-xl">Capturing moments in high definition.</p>
      <button className="mt-8 px-6 py-2 border border-white hover:bg-white hover:text-black transition-all duration-300">
        View Gallery
      </button>
    </div>
      
    </>
  )
}

export default App
