import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen?: boolean;
  onToggle: () => void;
}

const AccordionItem = ({ title, content, isOpen, onToggle }: AccordionItemProps) => {
  return (
    <div className="flex flex-col border-t border-t-[#dbe2e6] dark:border-t-gray-700 py-2">
      <div 
        className="flex cursor-pointer items-center justify-between gap-6 py-2"
        onClick={onToggle}
      >
        <h3 
          className="text-lg font-medium leading-normal" 
          style={{ 
            color: '#111618 !important',
            WebkitTextFillColor: '#111618 !important',
            opacity: '1 !important'
          }}
        >
          {title}
        </h3>
        <span className="text-xl font-light" style={{ color: '#617c89' }}>
          {isOpen ? '−' : '+'}
        </span>
      </div>
      {isOpen && (
        <p className="text-base font-normal leading-normal pb-2 mt-2" style={{ color: '#617c89' }}>
          {content}
        </p>
      )}
    </div>
  );
};

const AboutSection = () => {
  const [openSection, setOpenSection] = useState<string>('mision');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    // Aquí iría la lógica de envío del formulario
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const teamMembers = [
    {
      name: "Dra. Emily Carter",
      role: "Directora Médica",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKOz87XrG4mASkx_T-xImBn05SebUgc1M8Bhc42S7gnj4_XkHDu9CqNVRH4IJJ6nmcjdT0ckADjJG3qOmpa2Qy3XMJ75CJWMJXIxyLDv23MFoQn9JC5w5YWDeDhDYis1vZCVmhv-Q-xuzdbyplUJCVDG7QAZUOAasAbpAngjlItK_mScibEeNeDr2_AgZdHCISFqa5QiXHJvd0hI32ie17tbjy42uoS6lKO_kLLTw_HeHVxRPZKk-dNx6PjBJM2M6qGgNr2noAm0BP"
    },
    {
      name: "Johnathan Reed",
      role: "Ingeniero de Software Principal",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgIlde8lN53r5pr2yhBt7J7acJ-gfde6jI902L5nQBxlUxQ73vnVjsp0yRvOabd1wyYa5B7Y0sVKXYSpcW5g_ERROwifwaRjgt3JPGQ14LANmbU3PqIIj31rNSmlAP3gJWPGTWrcsfFp97HMhaidwxky_hm--f9T_nAd5SXbR8oIDkM72_BRK1SasPuhG2m23is3k90sFqwllWhmKBwX2NpB-gkbFGUdZ39SvaSlxbbzkIIjIrVGC_SFrvYYUoLRgs-ChbRTiw9JeW"
    },
    {
      name: "Maria Garcia",
      role: "Jefa de Producto",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0AvkU0YXItYrQFaV9heUtLfrwts-ZEG9zEI7YF_J8lKiRnbIH8hngBnxslCUrlKc-NEN8DqYJBZ2Vlvhu9O7teJnjEz3DOn8_SPvQDQDmAbWUV_iTELTr7sRj1BVlpFDgwYXKMqoNu-UDMXI2tvte5RhDgX_-IcpzVSgs0cw8JRMcymJ-3dlkFLnrtemLuSE9G9rLlSGS94eAPqVBwi41HyXklVTdTNw_ykY1dLyuK09Mua_x-Hpf2pDKyT4veKOqVckY9EivsCOf"
    },
    {
      name: "David Chen",
      role: "Director Ejecutivo",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRCDz_RhswEIfxH4o5LzVvwQaDno6GUNOQHr5_mv2w8FwRESbbvkkOtkNaleqmoLk0e9c-4LoR8V2dpGfxQsevrXMwR2UQXLqPi6ikubCfGOYk2RJKpmQwqwMvy4mfgHS68ur_GOAkuXgb2Iio0rCbTTmZvTnAJgs9If1lvTHCQCnycSxeY6epM3qcz28FD4_yTiSF4T4GMfmIOdx5q_OHtY4cugwfmQBCWLWIEymHDB3BJFPajS8D7rzbowxw2tnqznwimIMxgOgY"
    }
  ];

  return (
    <section className="bg-gray-50 dark:bg-background-dark">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-4">
        <div className="min-h-[480px] flex flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-lg items-center justify-center p-4 relative"
             style={{
               backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBfCb05BgLWlNv0jiwZ_4ew4CuqI_vX61ub8wWm8237iYROapNoNIaEInsGcpn37JmtHkK3b-8Xn3dwYZDngxt8Tjpw9h3FqLudlAOF9ViO2sSqanGxl59m4fNvgnMejlx2m3g8nwjR_U7RQy8_JR5yrjJycX2wvi_elVIvrpYIi_0AhCgpGDV7Faz3XrLkr6ZhGa5NycHe4jq63b62wX0fTnsU-GMaV-EY-hJJcErWTdIpnnQFaQGAnBPQT7tyWUou7kzb9DUxC6SA")`
             }}
        >
          <div className="flex flex-col gap-2 text-center max-w-3xl">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
              Innovando la atención médica, una cita a la vez.
            </h1>
            <h2 className="text-white text-sm font-normal leading-normal md:text-base">
              Conozca más sobre nuestra misión de revolucionar la industria de la salud a través de la tecnología.
            </h2>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values Section */}
      <div className="px-4 md:px-20 lg:px-40 flex justify-center py-10">
        <div className="flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h2 
                className="text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3" 
                style={{ 
                  color: '#111618 !important',
                  WebkitTextFillColor: '#111618 !important',
                  opacity: '1 !important'
                }}
              >
                Nuestra Misión, Visión y Valores
              </h2>
              <div className="flex flex-col">
                <AccordionItem
                  title="Nuestra Misión"
                  content="Simplificar y mejorar la experiencia de atención médica tanto para pacientes como para proveedores a través de tecnología innovadora y accesible."
                  isOpen={openSection === 'mision'}
                  onToggle={() => toggleSection('mision')}
                />
                <AccordionItem
                  title="Nuestra Visión"
                  content="Crear un futuro en el que la atención médica se integre perfectamente en la vida diaria, capacitando a las personas para que tomen el control de su salud con confianza y facilidad."
                  isOpen={openSection === 'vision'}
                  onToggle={() => toggleSection('vision')}
                />
                <div className="border-b border-b-[#dbe2e6] dark:border-b-gray-700">
                  <AccordionItem
                    title="Nuestros Valores"
                    content="Centralidad en el paciente, Innovación, Integridad, Colaboración y Accesibilidad. Estos principios básicos guían cada decisión que tomamos y cada producto que creamos."
                    isOpen={openSection === 'valores'}
                    onToggle={() => toggleSection('valores')}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 bg-cover bg-center rounded-lg min-h-[300px]"
                 style={{
                   backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWWOmzPoIFlJPWgKOPN5BoIe70dvN39QrqNvahRBkfcn8g5M1uUw-lM0oFs4gpniUGDtZLA5xGcBW4ybRik19nYYLS3tdAYgYDbz4l2r4OqK_FH5taguZXG0Fzh85WMdR7hV-Kgx9pcXjfXGWNh8Tz6l6aZaBxifGnIhKHoVH891U_MTCcTSZVs2b4_C3vBifUoUsH41Zfi8eMUau6lGcL4xvokcFFnHjxnEqL1gCDOnUDCsUmLYG1r7_JO7H2SBNxSSw2IOrBsNmR')"
                 }}
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="px-4 md:px-20 lg:px-40 flex justify-center py-10 bg-white dark:bg-background-dark">
        <div className="flex flex-col max-w-[960px] flex-1">
          <h2 
            className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-center" 
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            Conozca a Nuestro Equipo
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 p-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col gap-3 text-center pb-3">
                <div className="px-4">
                  <div 
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full"
                    style={{ backgroundImage: `url("${member.image}")` }}
                  />
                </div>
                <div>
                  <p 
                    className="text-lg font-medium leading-normal" 
                    style={{ 
                      color: '#111618 !important',
                      WebkitTextFillColor: '#111618 !important',
                      opacity: '1 !important'
                    }}
                  >
                    {member.name}
                  </p>
                  <p 
                    className="text-base font-normal leading-normal" 
                    style={{ 
                      color: '#617c89 !important',
                      WebkitTextFillColor: '#617c89 !important',
                      opacity: '1 !important'
                    }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="px-4 md:px-20 lg:px-40 flex justify-center py-10">
        <div className="flex flex-col max-w-[960px] flex-1 items-center">
          <h2 
            className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5 text-center" 
            style={{ 
              color: '#111618 !important',
              WebkitTextFillColor: '#111618 !important',
              opacity: '1 !important'
            }}
          >
            Contáctenos
          </h2>
          <p className="text-center !text-[#617c89] dark:!text-gray-400 mb-8 max-w-2xl" style={{ color: '#617c89' }}>
            ¿Tiene preguntas o desea obtener más información sobre nuestra plataforma? Nos encantaría 
            saber de usted. Contáctenos a través del siguiente formulario y un miembro de nuestro equipo 
            se pondrá en contacto con usted en breve.
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                name="nombre"
                type="text"
                placeholder="Su Nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="flex-1 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-blue-600 focus:border-blue-600 px-4 py-2"
                style={{
                  backgroundColor: 'white !important',
                  color: '#111618 !important',
                  border: '1px solid #dbe2e6'
                }}
                required
              />
              <input 
                name="email"
                type="email"
                placeholder="Su Correo Electrónico"
                value={formData.email}
                onChange={handleInputChange}
                className="flex-1 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-blue-600 focus:border-blue-600 px-4 py-2"
                style={{
                  backgroundColor: 'white !important',
                  color: '#111618 !important',
                  border: '1px solid #dbe2e6'
                }}
                required
              />
            </div>
            <textarea
              name="mensaje"
              placeholder="Su Mensaje"
              rows={5}
              value={formData.mensaje}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-blue-600 focus:border-blue-600 px-4 py-2"
              style={{
                backgroundColor: 'white !important',
                color: '#111618 !important',
                border: '1px solid #dbe2e6'
              }}
              required
            />
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 px-5 text-base font-bold rounded-lg"
            >
              Enviar Mensaje
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;