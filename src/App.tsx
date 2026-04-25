import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'Product', href: '#products' },
  { name: 'Newsroom', href: '#news' },
  { name: 'Contact', href: '#contact' },
];

const products = [
  {
    id: 1,
    title: 'The Iconic Burger',
    name: 'ABC BURGER',
    desc: '두 장의 100% 순 쇠고기 패티와 특별한 소스의 완벽한 조화.',
    color: 'bg-mcd-red',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'World Famous',
    name: 'FRENCH FRIES',
    desc: '바삭하고 황금빛으로 구워진 세계 최고의 감자튀김.',
    color: 'bg-mcd-yellow',
    textColor: 'text-mcd-black',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Sweet Treat',
    name: 'ABC FLURRY',
    desc: '부드러운 아이스크림과 달콤한 오레오의 시원한 만남.',
    color: 'bg-white',
    textColor: 'text-mcd-black',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80',
  },
];

const MarqueeText = () => {
  return (
    <div className="relative w-full overflow-hidden bg-mcd-yellow py-6 text-black border-y-4 border-black shadow-[0_8px_0px_0px_rgba(0,0,0,1)] z-20">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ ease: 'linear', duration: 15, repeat: Infinity }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            <span className="mx-8 font-display text-5xl md:text-6xl font-black uppercase italic tracking-tighter">Quality</span>
            <span className="text-4xl font-black">&#x2022;</span>
            <span className="mx-8 font-display text-5xl md:text-6xl font-black uppercase italic tracking-tighter">Service</span>
            <span className="text-4xl font-black">&#x2022;</span>
            <span className="mx-8 font-display text-5xl md:text-6xl font-black uppercase italic tracking-tighter">Cleanliness</span>
            <span className="text-4xl font-black">&#x2022;</span>
            <span className="mx-8 font-display text-5xl md:text-6xl font-black uppercase italic tracking-tighter">Value</span>
            <span className="text-4xl font-black">&#x2022;</span>
            <span className="mx-8 font-display text-5xl md:text-6xl font-black uppercase italic tracking-tighter">Smile</span>
            <span className="text-4xl font-black">&#x2022;</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'viewProject'>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 300 });

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], ['0%', '50%']);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#DA291C] font-sans selection:bg-black selection:text-[#FFC72C] text-black">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:block"
        style={{ x: smoothX, y: smoothY }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full text-center uppercase font-black italic tracking-tighter -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          initial="default"
          animate={cursorState}
          variants={{
            default: { width: 24, height: 24, backgroundColor: '#DA291C', border: '4px solid #000', color: 'transparent' },
            hover: { width: 48, height: 48, backgroundColor: '#FFC72C', border: '5px solid #000', color: 'transparent' },
            viewProject: { width: 140, height: 140, backgroundColor: '#FFC72C', border: '6px solid #000', color: '#000' }
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {cursorState === 'viewProject' && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="leading-[1.1] text-xl"
            >
              View<br/>Project
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 border-b-4 border-black ${
          isScrolled ? 'bg-[#FFC72C] py-4 shadow-[0_8px_0px_0px_rgba(0,0,0,1)]' : 'bg-[#DA291C] py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6 text-3xl md:text-4xl font-display font-black italic uppercase tracking-tighter text-black"
          >
            <div className="flex -space-x-3 group relative cursor-none" onMouseEnter={() => setCursorState('hover')} onMouseLeave={() => setCursorState('default')}>
              <div className="h-10 w-10 md:h-12 md:w-12 bg-[#FFC72C] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-2xl md:text-3xl z-30 transform transition-transform group-hover:rotate-0 -rotate-12 pt-1 pb-1">A</div>
              <div className="h-10 w-10 md:h-12 md:w-12 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-2xl md:text-3xl z-20 transform transition-transform group-hover:rotate-0 translate-y-3 pt-1 pb-1">B</div>
              <div className="h-10 w-10 md:h-12 md:w-12 bg-[#DA291C] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-2xl md:text-3xl text-white z-10 transform transition-transform group-hover:rotate-0 rotate-12 pt-1 pb-1">C</div>
            </div>
            <span>ABC BURGER</span>
          </motion.div>
          
          <div className="hidden md:flex gap-4">
            {navLinks.map((link, i) => (
              <motion.a
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={link.name}
                href={link.href}
                className="text-xl font-black uppercase tracking-widest text-black hover:bg-black hover:text-[#FFC72C] px-4 py-2 border-4 border-transparent hover:border-black transition-colors"
                onMouseEnter={() => setCursorState('hover')}
                onMouseLeave={() => setCursorState('default')}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <button 
            className="md:hidden text-black bg-[#FFC72C] border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
            onClick={() => setMobileMenuOpen(true)}
            onMouseEnter={() => setCursorState('hover')}
            onMouseLeave={() => setCursorState('default')}
          >
            <Menu size={24} strokeWidth={3} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] bg-[#DA291C] border-8 border-black flex flex-col items-center justify-center p-6"
        >
          <button 
            className="absolute top-6 right-6 text-black bg-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={32} strokeWidth={3} />
          </button>
          <div className="flex flex-col gap-8 text-center w-full max-w-sm">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-display uppercase italic font-black text-black bg-white border-4 border-black py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFC72C] transition-colors active:translate-y-1 active:translate-x-1 active:shadow-none block"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center text-center w-full max-w-5xl bg-white border-4 border-black p-8 md:p-16 xl:p-24 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-block bg-black text-[#FFC72C] px-6 py-2 font-black tracking-widest uppercase text-sm md:text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            Our Value and Vision
          </motion.h2>
          
          <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-display font-black uppercase italic tracking-tighter leading-none">
              <span className="block text-black">우리의 맛을</span>
              <span className="block text-[#DA291C]">우리의 색깔로</span>
              <span className="block text-black">만들어 나갑니다</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 max-w-2xl text-xl md:text-3xl font-bold uppercase tracking-tight text-black opacity-80"
          >
            Iconic products and global standards, delivering momentary joy to everyone, everywhere.
          </motion.p>
        </motion.div>

        {/* Abstract Background Element */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] h-64 w-64 border-8 border-black bg-[#FFC72C] -rotate-12 opacity-80 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]" />
          <div className="absolute bottom-[20%] right-[5%] h-80 w-80 border-8 border-black bg-white rotate-12 opacity-80 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]" />
        </div>
      </section>

      {/* Marquee Section */}
      <MarqueeText />

      {/* Products Array Sectiom - "What we do" style */}
      <section id="products" className="py-32 px-6 bg-[#FEE11A] overflow-hidden border-b-4 border-black">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 inline-block"
          >
            <h2 className="text-5xl md:text-7xl font-display font-black italic uppercase tracking-tighter">
              What we <span className="text-[#DA291C]">serve.</span>
            </h2>
            <div className="h-4 w-32 bg-black mt-4"></div>
          </motion.div>

          <div className="flex flex-col gap-12 lg:gap-24">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } border-4 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] group items-stretch`}
              >
                {/* Image side */}
                <div 
                  onMouseEnter={() => setCursorState('viewProject')}
                  onMouseLeave={() => setCursorState('default')}
                  className={`w-full lg:w-1/2 overflow-hidden border-b-4 border-black lg:border-b-0 ${idx % 2 === 1 ? 'lg:border-l-4' : 'lg:border-r-4'} aspect-[4/3] lg:aspect-square bg-zinc-900 relative cursor-none`}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                {/* Content side */}
                <div className={`w-full lg:w-1/2 p-8 lg:p-16 flex flex-col items-start justify-between ${product.color === 'bg-white' ? 'bg-white text-black' : product.color + (product.color === 'bg-mcd-red' ? ' text-white' : ' text-black')}`}>
                  <div className="flex flex-col items-start gap-4">
                    <span className="bg-black text-white font-black uppercase tracking-widest text-sm md:text-base border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      {product.title}
                    </span>
                    <h3 className="font-display text-6xl md:text-[6rem] lg:text-[7rem] italic font-black uppercase tracking-tighter leading-[0.85] mt-4">
                      {product.name}
                    </h3>
                    <p className="text-xl md:text-2xl font-bold uppercase tracking-tight mt-6 opacity-90">
                      {product.desc}
                    </p>
                  </div>
                  <button 
                    onMouseEnter={() => setCursorState('hover')}
                    onMouseLeave={() => setCursorState('default')}
                    className="mt-12 flex w-max items-center gap-4 bg-black text-white border-4 border-black px-8 py-4 font-black text-2xl uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all group/btn"
                  >
                    자세히 보기
                    <ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Large Typography Highlight */}
      <section className="py-40 px-6 bg-black text-white border-b-4 border-black overflow-hidden shadow-[inset_0_4px_0_0_rgba(0,0,0,1)]">
        <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-6xl md:text-[10rem] lg:text-[13rem] leading-none text-[#FFC72C] italic font-black uppercase tracking-tighter">
              I'm Lovin' It
            </h2>
            <p className="mt-12 text-2xl md:text-5xl font-black uppercase border-4 border-black bg-[#DA291C] text-white px-8 py-4 shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] rotate-[-2deg] inline-block">
              맛을 통해 세상에 기쁨을 전합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer / CTA like Codecrayon's "Contact" */}
      <footer id="contact" className="px-6 py-24 bg-white text-black">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            <div className="max-w-3xl">
              <h2 className="font-display text-5xl md:text-[6rem] italic font-black uppercase tracking-tighter mb-8 text-black">
                Contact
              </h2>
              <p className="text-3xl md:text-5xl md:leading-[1.2] font-black uppercase tracking-tight">
                ABC버거와 함께 비즈니스 발전에 필요한 <br className="hidden md:block"/>
                <span className="bg-[#FFC72C] border-4 border-black px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block mt-2">모든 순간</span>을 나누고 <br className="hidden md:block"/>혁신적인 맛을 경험하세요!
              </p>
              
              <a 
                href="mailto:contact@abcburger.example.com" 
                onMouseEnter={() => setCursorState('hover')}
                onMouseLeave={() => setCursorState('default')}
                className="group mt-12 inline-flex items-center gap-6 bg-[#DA291C] text-white border-4 border-black px-10 py-6 text-3xl md:text-5xl font-black uppercase italic shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:shadow-none active:translate-y-1 active:translate-x-1 transition-all"
              >
                Let's Talk 
                <span className="flex h-16 w-16 items-center justify-center bg-black border-4 border-black text-white">
                  <ArrowRight strokeWidth={4} />
                </span>
              </a>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-2 text-lg font-bold uppercase tracking-widest bg-[#FFC72C] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-8 md:mt-0">
              <p>123 ABC Burger Way, Chicago, IL</p>
              <p>hello@abc-burger.example.com</p>
              <p className="mt-8 uppercase tracking-wider opacity-60">Copyright &copy; ABC Burger Corp.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
