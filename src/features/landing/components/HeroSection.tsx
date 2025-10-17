import backgroundImage from '@/assets/833.jpg'
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSetion = () => {

  return (
    <section className='relative h-[90vh] flex items-center justify-center overflow-hidden'>

      <img
      src={backgroundImage}
      alt='Profecional medico realizando una consula'
      className='absolute inset-0 h-full w-full object-cover'
      loading='eager'
      />

      <div className='absolute inset-0 bg-black/40 z-10'  />

    <div className="container relative z-20 px-4 text-center text-white" >
      <h1 className="text-4xl md:text-6xl font-bold mb-6 loanding-tight ">
        Tu salud en las mejores manos
      </h1>
      <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" >
        Conectamos pacientes con los mejores especialistas medicos de forma rápida y segura.
      </p>
      <div className='flex flex-col sm:flex-row gap-4 justify-center'  >
      <Button
       className="transform rounded-full  cursor-pointer bg-green-500 px-8 py-4 font-bold text-white transition-transform duration-300 hover:scale-105 hover:bg-green-600">
       <Link
        to='register'
        >
        Soy Paciente
        </Link>
      </Button>
      <Button
      className='transform rounded-full cursor-pointer bg-blue-600 px-8 py-4 font-bold text-white transition-transform duration-300 hover:scale-105 hover:bg-blue-500'
      >
        <Link
        to='register'
        >
        Soy Doctor
        </Link>
      </Button>
      </div>

    </div>
    </section>

  )

}

export default HeroSetion;