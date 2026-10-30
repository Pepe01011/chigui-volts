import React, { useState, useEffect } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ugiwznvvyijfqcvvrcxp.supabase.co';
const supabaseKey = 'sb_publishable_6h5r-qRrJjxP4mtqdvTb4Q_Dlja-IPR';
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState('');
  
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
    metodoPago: 'Transferencia bancaria (Nequi/Daviplata)'
  });

  const [enviando, setEnviando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const abrirFormulario = (nombrePlan) => {
    setPlanSeleccionado(nombrePlan);
    setModalAbierto(true);
    setMensajeExito(false);
  };

  const cerrarFormulario = () => {
    setModalAbierto(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const { error } = await supabase
        .from('inscripciones')
        .insert([
          {
            nombre: formData.nombre,
            telefono: formData.telefono,
            correo: formData.correo,
            direccion: formData.direccion,
            metodo_pago: formData.metodoPago,
            plan: planSeleccionado
          }
        ]);

      if (error) throw error;

      setEnviando(false);
      setMensajeExito(true);
      
      setFormData({
        nombre: '',
        telefono: '',
        correo: '',
        direccion: '',
        metodoPago: 'Transferencia bancaria (Nequi/Daviplata)'
      });

    } catch (error) {
      console.error('Error al guardar datos:', error);
      alert('Hubo un error al guardar tu inscripción. Intenta de nuevo.');
      setEnviando(false);
    }
  };

  return (
    <div className="App">
      <div className="app-overlay">
        
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
          <div className=" -container">
            <img src="/logo.png" alt="ChigüiVolt Logo" className="logo-img" />
            <div className="text-container">
              <h1 className="neon-text">ChigüiVolt</h1>
              <p className="neon-text-yellow">Energía inteligente para el campo</p>
            </div>
          </div>
        </header>

        <main className="container">
          <section className="info-section">
            <div className="reveal">
              <h2 className="neon-text-blue">¿Qué queremos hacer?</h2>
              <hr className="divider neon-divider" />
              <p>Buscamos crear paneles solares programables que se enciendan o apaguen automáticamente al recibir cierta cantidad de luz solar, con el fin de aprovechar las energías limpias, apoyar a las personas de zonas rurales y reducir el gasto de energía eléctrica.</p>
              <p>Nuestra misión es proveer soluciones tecnológicas innovadoras y accesibles para la gestión de energía renovable, enfocadas en mejorar la calidad de vida de las comunidades rurales mediante sistemas automatizados y eficientes.</p>
            </div>

            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <h2 className="neon-text-blue">¿A dónde queremos llegar?</h2>
              <hr className="divider neon-divider" />
              <p>Para el año 2028, queremos consolidarnos como líderes regionales en el desarrollo de sistemas solares programables, impulsando la transición energética y el desarrollo sostenible en el departamento del Meta.</p>
            </div>
            
            <div className="reveal" style={{ transitionDelay: '0.4s' }}>
              <h2 className="neon-text-blue">¿Cómo lo vamos a hacer?</h2>
              <hr className="divider neon-divider" />
              <p>Generando un sistema inteligente y automático para controlar paneles solares dirigido a ciudadanos en zonas rurales.</p>
              <p>Para lograrlo, nuestro equipo trabaja en la programación del código para automatizar el panel solar y en la integración de los paneles con los sensores de luz. Todo esto lo desarrollamos apoyándonos en áreas especializadas de hardware, desarrollo lógico y logística de implementación.</p>
            </div>
          </section>

          <section className="planes-section reveal">
            <h2 className="neon-text-blue">Nuestros Planes de Energía</h2>
            <hr className="divider neon-divider" />
            <p>Selecciona el plan que mejor se adapte a las necesidades de tu finca u hogar rural:</p>
            
            <div className="tarjetas-container">
              <div className="tarjeta reveal">
                <h3>Plan Básico</h3>
                <h4 className="precio neon-text-blue">$1.000.000</h4>
                <ul>
                  <li><span className="neon-text-yellow">✔️</span> 1 Panel solar estándar.</li>
                  <li><span className="neon-text-yellow">✔️</span> Sistema automático básico.</li>
                  <li><span className="neon-text-yellow">✔️</span> Instalación en zona rural.</li>
                  <li><span className="neon-text-yellow">✔️</span> Garantía de 6 meses.</li>
                </ul>
                <button className="btn-interesa neon-btn" onClick={() => abrirFormulario('Plan Básico')}>Me interesa</button>
              </div>

              <div className="tarjeta reveal" style={{ transitionDelay: '0.2s' }}>
                <h3>Plan Premium</h3>
                <h4 className="precio neon-text-blue">$2.500.000</h4>
                <ul>
                  <li><span className="neon-text-yellow">✔️</span> 3 Paneles de alta eficiencia.</li>
                  <li><span className="neon-text-yellow">✔️</span> Sistema automático avanzado.</li>
                  <li><span className="neon-text-yellow">✔️</span> Batería de respaldo nocturno.</li>
                  <li><span className="neon-text-yellow">✔️</span> Mantenimiento gratis 1 año.</li>
                </ul>
                <button className="btn-interesa neon-btn" onClick={() => abrirFormulario('Plan Premium')}>Me interesa</button>
              </div>

              <div className="tarjeta vip reveal" style={{ transitionDelay: '0.4s' }}>
                <h3 className="neon-text-yellow">Plan VIP</h3>
                <h4 className="precio neon-text-yellow">$5.000.000</h4>
                <ul>
                  <li><span className="neon-text-blue">✔️</span> 6 Paneles de alta eficiencia.</li>
                  <li><span className="neon-text-blue">✔️</span> Batería de gran capacidad.</li>
                  <li><span className="neon-text-blue">✔️</span> Soporte técnico prioritario.</li>
                  <li><span className="neon-text-blue">✔️</span> Monitoreo en tiempo real.</li>
                </ul>
                <button className="btn-interesa neon-btn-vip" onClick={() => abrirFormulario('Plan VIP')}>Me interesa</button>
              </div>
            </div>
          </section>
        </main>

      </div>

      {/* VENTANA EMERGENTE (MODAL) */}
      {modalAbierto && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <button className="btn-cerrar" onClick={cerrarFormulario}>✕</button>

            {!mensajeExito ? (
              <>
                <h2 className="neon-text-blue">Inscripción al Servicio</h2>
                <p className="subtitulo-modal">Has seleccionado: <strong className="neon-text-yellow">{planSeleccionado}</strong></p>
                
                <form onSubmit={handleSubmit} className="form-inscripcion">
                  <div className="form-group">
                    <label>Nombre Completo:</label>
                    <input 
                      type="text" 
                      name="nombre" 
                      value={formData.nombre} 
                      onChange={handleChange} 
                      required 
                      placeholder="Ej. Pedro Pérez"
                    />
                  </div>

                  <div className="form-group">
                    <label>Teléfono / WhatsApp:</label>
                    <input 
                      type="tel" 
                      name="telefono" 
                      value={formData.telefono} 
                      onChange={handleChange} 
                      required 
                      placeholder="Ej. 3101234567"
                    />
                  </div>

                  <div className="form-group">
                    <label>Correo Electrónico:</label>
                    <input 
                      type="email" 
                      name="correo" 
                      value={formData.correo} 
                      onChange={handleChange} 
                      required 
                      placeholder="correo@ejemplo.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>Dirección de la finca u hogar rural:</label>
                    <input 
                      type="text" 
                      name="direccion" 
                      value={formData.direccion} 
                      onChange={handleChange} 
                      required 
                      placeholder="Vereda / Municipio / Referencias"
                    />
                  </div>

                  <div className="form-group">
                    <label>Método de Pago Preferido:</label>
                    <select name="metodoPago" value={formData.metodoPago} onChange={handleChange}>
                      <option value="Transferencia bancaria (Nequi/Daviplata)">Transferencia bancaria (Nequi/Daviplata)</option>
                      <option value="Tarjeta de crédito / débito">Tarjeta de crédito / débito</option>
                      <option value="Pago contra entrega en finca">Pago contra entrega en finca</option>
                    </select>
                  </div>

                  <button type="submit" className="neon-btn btn-enviar" disabled={enviando}>
                    {enviando ? 'Guardando en base de datos...' : 'Confirmar e Inscribirse'}
                  </button>
                </form>
              </>
            ) : (
              <div className="mensaje-exito">
                <h2 className="neon-text-yellow">¡Registro Exitoso! ⚡</h2>
                <p>Tus datos han sido registrados en nuestro sistema para el <strong>{planSeleccionado}</strong>.</p>
                <p>Un asesor de ChigüiVolt te contactará por teléfono o WhatsApp para coordinar la instalación.</p>
                <button className="neon-btn" onClick={cerrarFormulario}>Aceptar</button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default App;