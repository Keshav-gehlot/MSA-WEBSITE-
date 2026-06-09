import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Calendar, Github, Linkedin, Twitter, MapPin, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white bg-designer-grid font-sans overflow-x-hidden relative selection:bg-purple-500/30">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <Navbar />
      
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col gap-32 pb-32">
        <HeroSection />
        <AboutSection />
        <TeamSection />
        <EventsSection />
        <ContactSection />
      </main>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out flex justify-center py-4 px-6 ${
        scrolled ? 'pt-4' : 'pt-8'
      }`}
    >
      <div
        className={`flex items-center justify-between w-full max-w-7xl transition-all duration-700 ${
          scrolled
            ? 'bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'px-0'
        }`}
      >
        {/* Logo area */}
        <div className={`transition-all duration-700 flex items-center justify-center ${
          scrolled 
            ? 'text-2xl font-black tracking-tighter text-white' 
            : 'border-2 border-dashed border-gray-600 w-24 h-12'
        }`}>
          {scrolled ? (
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 animate-pulse">MSA</span>
          ) : (
             <span className="sr-only">MSA</span>
          )}
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          {['About Us', 'Our Team', 'Events'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className={`transition-all duration-700 uppercase uppercase tracking-widest text-xs font-medium hover:text-purple-400 ${
                scrolled
                  ? 'text-gray-300'
                  : 'border-2 border-dashed border-gray-700 px-6 py-3 text-gray-500'
              }`}
            >
              {scrolled ? link : <span className="opacity-50 font-mono text-[10px]">{link}</span>}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center w-full mb-16 opacity-90">
      <div className="w-20 h-10 rounded-[100%] border border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)] shrink-0 mr-6" />
      <div className="h-px bg-gradient-to-r from-purple-500/50 to-transparent grow relative" />
      <ArrowRight className="text-purple-500 mx-6 shrink-0" size={28} />
      <h2 className="text-5xl md:text-7xl font-thin tracking-tighter shrink-0 text-white uppercase">
        {title}
      </h2>
    </div>
  );
}

function HeroSection() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // 0: Giant X
    // 1: M & S appear
    // 2: X shrinks to A
    const t1 = setTimeout(() => setPhase(1), 1800);
    const t2 = setTimeout(() => setPhase(2), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20">
      <AnimatePresence>
        {phase < 2 && (
          <motion.div
            layoutId="central-x"
            className="fixed inset-0 m-auto w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <XShape giant={true} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-end justify-center font-black text-white tracking-tighter pb-[10vh]" style={{ fontSize: 'clamp(6rem, 20vw, 16rem)', lineHeight: '0.85' }}>
        <motion.div
           initial={{ y: 50, opacity: 0, filter: 'blur(15px)' }}
           animate={phase >= 1 ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          M
        </motion.div>
        <motion.div
           initial={{ y: 50, opacity: 0, filter: 'blur(15px)' }}
           animate={phase >= 1 ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
           className="mr-[1vw]"
        >
          S
        </motion.div>

        <div className="relative w-[0.8em] h-[1em] ml-[1vw]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
            <motion.line x1="50" y1="0" x2="15" y2="100" stroke="white" strokeWidth="12" strokeLinecap="round"
               initial={{ pathLength: 0, opacity: 0 }}
               animate={phase >= 1 ? { pathLength: 1, opacity: 1 } : {}}
               transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            />
            <motion.line x1="50" y1="0" x2="85" y2="100" stroke="white" strokeWidth="12" strokeLinecap="round"
               initial={{ pathLength: 0, opacity: 0 }}
               animate={phase >= 1 ? { pathLength: 1, opacity: 1 } : {}}
               transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            />
          </svg>

          {/* Target Box for the A Custom Crossbar */}
          <div className="absolute top-[62%] left-[28%] w-[44%] h-[12%] flex items-center justify-center -translate-y-1/2 rounded-full pointer-events-none">
             {phase >= 2 && (
               <motion.div
                 layoutId="central-x"
                 className="w-full h-full flex items-center justify-center relative z-20"
                 transition={{ type: "spring", stiffness: 50, damping: 14, mass: 0.8 }}
               >
                 <XShape giant={false} />
               </motion.div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
}

function XShape({ giant }: { giant: boolean }) {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div 
        className={`absolute bg-gradient-to-r from-purple-600 via-white to-purple-600 rounded-full blur-[1px] transition-all duration-1000 ease-in-out ${
          giant ? 'w-full h-4 rotate-[25deg] drop-shadow-[0_0_50px_rgba(168,85,247,0.9)] opacity-90' : 'w-[125%] h-[8px] rotate-[8deg] shadow-[0_0_15px_rgba(168,85,247,1)] opacity-100'
        }`} 
      />
      <div 
        className={`absolute bg-gradient-to-r from-blue-600 via-white to-blue-600 rounded-full blur-[1px] transition-all duration-1000 ease-in-out delay-75 ${
          giant ? 'w-full h-4 -rotate-[25deg] drop-shadow-[0_0_50px_rgba(59,130,246,0.9)] opacity-90' : 'w-[125%] h-[8px] -rotate-[8deg] shadow-[0_0_15px_rgba(59,130,246,1)] opacity-100'
        }`} 
      />
    </div>
  )
}

const ABOUT_IMAGES = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200'
];

function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % ABOUT_IMAGES.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + ABOUT_IMAGES.length) % ABOUT_IMAGES.length);

  return (
    <section id="about-us" className="relative pt-20">
      <SectionHeader title="About Us" />
      
      <div className="flex flex-col items-center gap-16">
        <div className="relative w-full max-w-5xl h-[300px] md:h-[500px] flex items-center justify-center" style={{ perspective: 1200 }}>
          {ABOUT_IMAGES.map((src, i) => {
            const isCenter = i === currentIndex;
            const isLeft = i === (currentIndex - 1 + ABOUT_IMAGES.length) % ABOUT_IMAGES.length;
            const isRight = i === (currentIndex + 1) % ABOUT_IMAGES.length;
            
            let x = 0; let z = 0; let rotateY = 0; let opacity = 0; let blur = 0;

            if (isCenter) {
              x = 0; z = 50; rotateY = 0; opacity = 1; blur = 0;
            } else if (isLeft) {
              x = -40; z = -150; rotateY = 30; opacity = 0.5; blur = 6;
            } else if (isRight) {
              x = 40; z = -150; rotateY = -30; opacity = 0.5; blur = 6;
            }

            return (
              <motion.div
                key={src}
                className="absolute w-3/5 md:w-1/2 h-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                animate={{ x: `${x}%`, z, rotateY, opacity, filter: `blur(${blur}px)` }}
                transition={{ duration: 0.8, ease: "anticipate" }}
                style={{ zIndex: isCenter ? 30 : 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <img src={src} alt="About Us Event" className="w-full h-full object-cover" />
              </motion.div>
            )
          })}

          <button onClick={prev} className="absolute left-4 md:left-12 z-40 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md transition-colors hover:scale-110">
            <ChevronLeft size={28} />
          </button>
          <button onClick={next} className="absolute right-4 md:right-12 z-40 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md transition-colors hover:scale-110">
             <ChevronRight size={28} />
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl p-10 md:p-14 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:bg-white/[0.04] transition-colors"
        >
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
           <p className="text-xl md:text-3xl text-gray-300 font-light leading-relaxed text-center">
             We are a passionate community of elite student developers driven by <span className="text-purple-400 font-medium">innovation</span> and <span className="text-blue-400 font-medium">collaboration</span>. Through the Microsoft Student Ambassador program, we empower peers to build the future using cutting-edge technologies.
           </p>
        </motion.div>
      </div>
    </section>
  )
}

const TEAM = [
  { name: 'Alex Johnson', role: 'Lead Organizer', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400' },
  { name: 'Sarah Lee', role: 'Technical Lead', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400' },
  { name: 'Michael Chen', role: 'Event Coordinator', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
  { name: 'Emily Davis', role: 'Community Manager', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400' },
];

function TeamSection() {
  return (
    <section id="our-team" className="pt-20">
      <SectionHeader title="Our Team" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {TEAM.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="group relative flex flex-col items-center p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)] hover:border-purple-500/30"
          >
            <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-[3px] border-white/10 group-hover:border-purple-500/70 transition-colors duration-500 relative">
              <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
            <p className="font-mono text-sm tracking-wide text-purple-400 mb-6 opacity-80">{member.role}</p>
            
            <div className="flex gap-5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <a href="#" className="text-gray-500 hover:text-white transition-colors hover:scale-110"><Github size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-[#0a66c2] transition-colors hover:scale-110"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-[#1da1f2] transition-colors hover:scale-110"><Twitter size={20} /></a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const EVENTS = [
  { type: 'Hackathon', title: 'Azure Cloud Hack', desc: 'Build scalable solutions using Microsoft Azure cloud services in our fully immersive 48-hour student hackathon.', date: 'Oct 15, 2026' },
  { type: 'Workshop', title: 'AI with Copilot', desc: 'Learn how to integrate GitHub Copilot into your daily developer workflow to maximize coding velocity.', date: 'Nov 02, 2026' },
  { type: 'Meetup', title: 'Tech Career Panel', desc: 'Industry experts from top engineering teams share their journey and tips for landing your first role.', date: 'Dec 10, 2026' },
];

function EventsSection() {
  return (
    <section id="events" className="pt-20">
      <SectionHeader title="Our Events" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {EVENTS.map((event, i) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="group relative p-10 rounded-[2rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 overflow-hidden hover:border-blue-500/40 transition-colors duration-500 flex flex-col h-full hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 text-xs font-mono tracking-wider text-gray-300 w-fit mb-8 bg-white/5 backdrop-blur-md">
              {event.type}
            </div>
            
            <h3 className="text-4xl font-light text-white mb-6 group-hover:text-blue-300 transition-colors">{event.title}</h3>
            <p className="text-gray-400 font-light text-lg leading-relaxed mb-16 flex-grow">
              {event.desc}
            </p>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto group-hover:border-blue-500/30 transition-colors">
              <div className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                <Calendar size={18} className="text-blue-400" />
                <span className="font-mono tracking-widest">{event.date}</span>
              </div>
              <ArrowRight size={24} className="text-white/30 group-hover:text-blue-400 group-hover:-rotate-45 transition-all duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center pt-20">
      <div>
        <h2 
          className="text-[5rem] sm:text-[7rem] lg:text-[8.5rem] leading-[0.85] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-blue-600 mb-12 pb-4"
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
        >
          CONTACT<br/>US
        </h2>
        
        <div className="space-y-8 pl-2">
          <div className="flex items-center gap-8 group">
            <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-purple-500 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300">
              <Mail className="text-gray-400 group-hover:text-purple-400 transition-colors" size={24} />
            </div>
            <div>
              <p className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-1.5">Directory</p>
              <p className="text-xl text-gray-200 font-light">msa@university.edu</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8 group">
            <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300">
              <MapPin className="text-gray-400 group-hover:text-blue-400 transition-colors" size={24} />
            </div>
            <div>
              <p className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-1.5">Headquarters</p>
              <p className="text-xl text-gray-200 font-light">Innovation Hub, Main Campus</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 sm:p-14 backdrop-blur-2xl relative overflow-hidden shadow-2xl">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <form className="relative z-10 flex flex-col gap-10">
          <div className="relative group">
            <input type="text" id="name" required className="w-full bg-transparent border-b border-white/20 py-4 text-lg text-white focus:outline-none focus:border-purple-500 transition-colors peer placeholder-transparent" placeholder="Name" />
            <label htmlFor="name" className="absolute left-0 top-4 text-gray-400 text-lg font-light transition-all cursor-text peer-focus:-top-3 peer-focus:text-xs peer-focus:text-purple-400 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-gray-500">Full Name</label>
            <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 peer-focus:w-full" />
          </div>

          <div className="relative group">
            <input type="email" id="email" required className="w-full bg-transparent border-b border-white/20 py-4 text-lg text-white focus:outline-none focus:border-blue-500 transition-colors peer placeholder-transparent" placeholder="Email" />
            <label htmlFor="email" className="absolute left-0 top-4 text-gray-400 text-lg font-light transition-all cursor-text peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-400 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-gray-500">Email Address</label>
            <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 peer-focus:w-full" />
          </div>

          <div className="relative group mt-2">
            <textarea id="message" required rows={4} className="w-full bg-transparent border-b border-white/20 py-4 text-lg text-white focus:outline-none focus:border-purple-500 transition-colors peer placeholder-transparent resize-none" placeholder="Message" />
            <label htmlFor="message" className="absolute left-0 top-4 text-gray-400 text-lg font-light transition-all cursor-text peer-focus:-top-3 peer-focus:text-xs peer-focus:text-purple-400 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-gray-500">Your Message</label>
            <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 peer-focus:w-full" />
          </div>

          <button type="button" className="relative w-full py-5 mt-6 rounded-2xl border border-white/20 font-medium tracking-widest uppercase overflow-hidden group">
            <span className="relative z-10 text-white transition-colors duration-500">Send Transmission</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </button>
        </form>
      </div>
    </section>
  )
}
