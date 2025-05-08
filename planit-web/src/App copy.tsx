// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import perfilPlanit from './assets/perfilPlanit.jpg';

function App() {

  return (
    <div className='mt-5 ml-5'>
      <div className='flex flex-wrap gap-6 items-center'>
        <div>
          <img className='rounded-full w-20' src={perfilPlanit} alt="Perfil Profissional" />
        </div>

        <div>
          <p className='text-xl font-bold'>Iriana Darua</p>

          <div>
            <p className='text-emerald-500 font-light'>Médica</p>
          </div>
        </div>
      </div>

      <div>
        <p>Slecione </p>
      </div>
    </div>
  )
}

export default App
