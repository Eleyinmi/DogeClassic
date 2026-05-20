import React, { useState, useEffect, useRef, useCallback } from "react";
import { Copy, Menu, X, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView, useAnimation } from "framer-motion";

const CONTRACT_ADDRESS = "0x20130bc88cb8dae42a7a987b1377a97471e1ae9a";
const UNISWAP_LINK = `https://app.uniswap.org/swap?outputCurrency=${CONTRACT_ADDRESS}&chain=ethereum`;
const DEXSCREENER_LINK = `https://dexscreener.com/ethereum/0xfbd9803a10f5a311eb00daadd84c3d5bb1f5f431`;

const DOGE_PHRASES = [
  "such wow", "very crypto", "much moon", "many gainz", "plz rich",
  "so OG", "much hodl", "very based", "wow", "such classic",
  "many frens", "very bullish", "much wagmi", "so doge", "wow coin",
];

/* ─── Gold Particle Canvas ─── */
function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number; y: number; r: number;
      vx: number; vy: number; alpha: number; fade: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * -0.5 - 0.2,
        alpha: Math.random(),
        fade: (Math.random() * 0.005 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.fade;
        if (p.alpha <= 0 || p.alpha >= 1) p.fade *= -1;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 200, 66, ${p.alpha * 0.6})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
}

/* ─── Cursor Glow ─── */
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed w-[400px] h-[400px] pointer-events-none z-[2] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(245,200,66,0.07) 0%, transparent 70%)",
        transition: "transform 0.08s ease-out",
        top: 0,
        left: 0,
      }}
    />
  );
}

/* ─── Marquee Ticker ─── */
function Marquee() {
  const items = [...DOGE_PHRASES, ...DOGE_PHRASES];
  return (
    <div className="marquee-outer overflow-hidden border-y-4 border-primary bg-card py-3 relative z-10">
      <div className="marquee-track flex gap-16 whitespace-nowrap">
        {items.map((p, i) => (
          <span key={i} className="font-comic text-primary font-bold text-lg uppercase shrink-0">
            ✦ {p}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Scroll Reveal wrapper ─── */
function Reveal({ children, delay = 0, direction = "up" }: {
  children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const initial = direction === "up" ? { opacity: 0, y: 40 }
    : direction === "left" ? { opacity: 0, x: -40 }
    : { opacity: 0, x: 40 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Counter ─── */
function AnimatedCount({ to, label, suffix = "" }: { to: string; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, type: "spring" }}
      className="bg-card/80 p-6 border-2 border-primary rounded-lg flex flex-col items-center justify-center hover:box-shadow-gold transition-all"
    >
      <span className="font-comic text-lg text-gray-400 mb-2">{label}</span>
      <span className="font-pixel text-xl md:text-2xl text-secondary">{to}{suffix}</span>
    </motion.div>
  );
}

/* ─── Floating Doge Phrase ─── */
const FloatingDogePhrase = ({ phrase, style }: { phrase: string; style: React.CSSProperties }) => (
  <div
    className="absolute font-comic text-primary font-bold opacity-25 pointer-events-none text-xl md:text-3xl z-0 select-none"
    style={style}
  >
    {phrase}
  </div>
);

/* ─── Main App ─── */
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedHtb, setCopiedHtb] = useState(false);

  const handleCopyCA = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }, []);

  const handleCopyHtb = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopiedHtb(true);
      setTimeout(() => setCopiedHtb(false), 2000);
    } catch { /* ignore */ }
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <GoldParticles />
      <CursorGlow />

      {/* ── Navbar ── */}
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur border-b-4 border-primary px-4 md:px-8 py-4 flex justify-between items-center">
        <div
          className="font-pixel text-primary md:text-xl text-base cursor-pointer hover:text-secondary transition-colors"
          onClick={() => scrollTo("home")}
          data-testid="link-home-logo"
        >
          ÐOGC CLASSIC
        </div>

        <div className="hidden md:flex items-center space-x-6 font-pixel text-xs">
          {["home", "about", "tokenomics", "howtobuy", "community"].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="hover:text-primary transition-colors uppercase"
              data-testid={`link-desktop-${id}`}
            >
              {id === "howtobuy" ? "HOW TO BUY" : id.toUpperCase()}
            </button>
          ))}
          <a href={UNISWAP_LINK} target="_blank" rel="noopener noreferrer" data-testid="link-desktop-buynow">
            <Button className="font-pixel bg-primary text-primary-foreground hover:bg-secondary animate-blink" data-testid="button-desktop-buynow">
              BUY NOW
            </Button>
          </a>
        </div>

        <button className="md:hidden text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-testid="button-mobile-menu-toggle">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed top-[72px] left-0 w-full bg-background border-b-4 border-primary flex flex-col font-pixel text-center text-sm z-40">
          {["home", "about", "tokenomics", "howtobuy", "community"].map((id) => (
            <button key={id} onClick={() => scrollTo(id)} className="py-4 border-b border-primary/20 hover:text-primary" data-testid={`link-mobile-${id}`}>
              {id === "howtobuy" ? "HOW TO BUY" : id.toUpperCase()}
            </button>
          ))}
          <a href={UNISWAP_LINK} target="_blank" rel="noopener noreferrer" className="py-4 text-primary animate-blink" data-testid="link-mobile-buynow">
            BUY NOW
          </a>
        </div>
      )}

      <main className="pt-20">

        {/* ── Hero Section ── */}
        <section id="home" className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden py-20">
          <div className="starburst" />

          <FloatingDogePhrase phrase="such wow" style={{ top: "12%", left: "8%", transform: "rotate(-15deg)" }} />
          <FloatingDogePhrase phrase="very crypto" style={{ top: "20%", right: "12%", transform: "rotate(18deg)" }} />
          <FloatingDogePhrase phrase="much moon" style={{ bottom: "28%", left: "15%", transform: "rotate(-8deg)" }} />
          <FloatingDogePhrase phrase="many gainz" style={{ bottom: "18%", right: "8%", transform: "rotate(12deg)" }} />
          <FloatingDogePhrase phrase="so OG" style={{ top: "55%", left: "5%", transform: "rotate(5deg)" }} />
          <FloatingDogePhrase phrase="wow" style={{ top: "45%", right: "5%", transform: "rotate(-10deg)" }} />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="mb-8 w-full max-w-lg"
            >
              <img
                src="/assets/hero-main.jpg"
                alt="DOGC Hero"
                className="w-full rounded-xl border-4 border-primary box-shadow-gold hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-pixel text-4xl md:text-6xl text-primary mb-4 glitch-text leading-tight"
              data-text="ÐOGE CLASSIC"
            >
              ÐOGE CLASSIC
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-pixel text-2xl md:text-4xl text-secondary mb-4"
            >
              $DOGC
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="font-pixel text-lg md:text-2xl mb-8 text-white"
            >
              SUCH REVIVAL. MUCH OG.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-comic text-xl md:text-2xl max-w-2xl mb-10 text-gray-300"
            >
              The original Dogecoin spirit is back. Community-owned. LP burned. Since 2013.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
              className="flex flex-col sm:flex-row gap-6 mb-12"
            >
              <a href={UNISWAP_LINK} target="_blank" rel="noopener noreferrer" data-testid="link-hero-buy">
                <Button size="lg" className="w-full sm:w-auto font-pixel text-base bg-primary text-primary-foreground hover:bg-secondary h-16 px-8 hover:box-shadow-gold transition-all" data-testid="button-hero-buy">
                  🟡 BUY $DOGC
                </Button>
              </a>
              <a href={DEXSCREENER_LINK} target="_blank" rel="noopener noreferrer" data-testid="link-hero-chart">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-pixel text-base border-4 border-primary text-primary hover:bg-primary/20 h-16 px-8" data-testid="button-hero-chart">
                  📊 CHART
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="bg-card border-dotted-gold p-4 rounded-xl flex flex-col sm:flex-row items-center gap-4"
            >
              <span className="font-pixel text-xs md:text-sm text-primary break-all" data-testid="text-ca-address">CA: {CONTRACT_ADDRESS}</span>
              <Button
                onClick={handleCopyCA}
                variant="secondary"
                className="font-pixel text-xs bg-secondary text-secondary-foreground shrink-0"
                data-testid="button-copy-ca"
              >
                {copied ? "COPIED! WOW 🎉" : <><Copy className="w-4 h-4 mr-2" />COPY</>}
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ── Marquee ── */}
        <Marquee />

        {/* ── About Section ── */}
        <section id="about" className="relative py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/assets/doge-dark.jpg')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-background/90" />

          <div className="relative z-10 max-w-6xl mx-auto">
            <Reveal>
              <h2 className="font-pixel text-3xl md:text-5xl text-primary text-center mb-16 text-shadow-gold">
                SUCH HISTORY. VERY OG.
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <Reveal direction="left">
                <div className="flex justify-center">
                  <img
                    src="/assets/dogc-coin.png"
                    alt="DOGC Coin"
                    className="w-64 h-64 md:w-96 md:h-96 object-contain animate-spin-float drop-shadow-[0_0_30px_rgba(245,200,66,0.6)]"
                  />
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.2}>
                <div className="font-comic text-xl md:text-2xl leading-relaxed text-gray-200">
                  <p className="mb-6">ÐOGE CLASSIC is a community takeover of the original Dogecoin spirit — back to December 2013.</p>
                  <p className="mb-6">Before the sells. Before the noise. Just OGs, holding, believing.</p>
                  <p>Being OG isn't everyone's cup of tea. You gotta be resilient. This is for the holders, the believers, the ones who never left.</p>
                </div>
              </Reveal>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { emoji: "🔥", title: "LP BURNED", desc: "Liquidity locked forever. Rug-proof. Community owns this." },
                { emoji: "👥", title: "COMMUNITY TAKEOVER", desc: "No dev wallet. No presale. Pure community." },
                { emoji: "⚡", title: "ETHEREUM CHAIN", desc: "Live on Uniswap V2. Buy directly on-chain." },
              ].map((card, i) => (
                <Reveal key={card.title} delay={i * 0.15}>
                  <div className="bg-card p-8 border-dashed-gold hover:box-shadow-gold transition-all duration-300 transform hover:-translate-y-3 group cursor-default">
                    <div className="text-4xl mb-4">{card.emoji}</div>
                    <h3 className="font-pixel text-lg text-primary mb-4 group-hover:text-secondary transition-colors">{card.title}</h3>
                    <p className="font-comic text-lg text-gray-300">{card.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Marquee 2 (reversed) ── */}
        <div className="marquee-outer overflow-hidden border-y-4 border-primary bg-card py-3 relative z-10">
          <div className="marquee-track-reverse flex gap-16 whitespace-nowrap">
            {[...DOGE_PHRASES, ...DOGE_PHRASES].map((p, i) => (
              <span key={i} className="font-comic text-secondary font-bold text-lg uppercase shrink-0">
                ★ {p}
              </span>
            ))}
          </div>
        </div>

        {/* ── Tokenomics Section ── */}
        <section id="tokenomics" className="relative py-24 px-4">
          <div className="absolute inset-0 bg-[url('/assets/dogc-chart.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <Reveal>
              <h2 className="font-pixel text-3xl md:text-5xl text-primary mb-16 text-shadow-gold">
                WOW SUCH TOKENOMICS
              </h2>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <AnimatedCount to="$DOGC" label="Ticker" />
              <AnimatedCount to="Ethereum" label="Chain" />
              <AnimatedCount to="BURNED 🔥" label="LP" />
              <AnimatedCount to="0% / 0%" label="Tax" />
            </div>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
                <div className="bg-card/80 border-dotted-gold p-4 rounded-xl flex flex-col sm:flex-row items-center gap-4">
                  <span className="font-pixel text-xs text-primary break-all" data-testid="text-tokenomics-ca">CA: {CONTRACT_ADDRESS}</span>
                  <Button onClick={handleCopyCA} variant="secondary" className="font-pixel text-xs shrink-0" data-testid="button-tokenomics-copy">
                    {copied ? "COPIED! WOW 🎉" : <><Copy className="w-4 h-4 mr-2" />COPY</>}
                  </Button>
                </div>
                <a href={DEXSCREENER_LINK} target="_blank" rel="noopener noreferrer" data-testid="link-tokenomics-dex">
                  <Button variant="outline" className="font-pixel border-2 border-primary text-primary hover:bg-primary/20 h-12 px-6 text-xs">
                    VIEW ON DEXSCREENER <ExternalLink className="ml-2 w-3 h-3" />
                  </Button>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── How To Buy Section ── */}
        <section id="howtobuy" className="py-24 px-4 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/assets/coins-texture.jpg')] bg-repeat" />

          <div className="relative z-10 max-w-5xl mx-auto">
            <Reveal>
              <h2 className="font-pixel text-3xl md:text-5xl text-primary text-center mb-16 text-shadow-gold">
                HOW MUCH BUY. VERY EASY.
              </h2>
            </Reveal>

            <div className="flex flex-col md:flex-row gap-12 items-center">
              <Reveal direction="left" delay={0.1}>
                <div className="md:w-1/3">
                  <img
                    src="/assets/doge-sunglasses.jpg"
                    alt="Cool Doge"
                    className="w-full rounded-2xl border-4 border-primary box-shadow-gold"
                  />
                </div>
              </Reveal>

              <div className="md:w-2/3 space-y-5">
                {[
                  {
                    n: "1", title: "Get ETH",
                    body: "Buy ETH on any exchange and send to your wallet (MetaMask, Rabby, etc.)",
                  },
                  {
                    n: "2", title: "Go to Uniswap",
                    body: "Visit Uniswap V2 and connect your wallet",
                  },
                  {
                    n: "3", title: "Paste CA",
                    body: null,
                  },
                  {
                    n: "4", title: "Swap & HODL",
                    body: "Set slippage to 1-3%, swap ETH for $DOGC and join the OGs",
                  },
                ].map((step, i) => (
                  <Reveal key={step.n} delay={i * 0.12}>
                    <div className="bg-card p-6 border-l-4 border-primary flex gap-4 items-start hover:box-shadow-gold transition-all duration-300 group">
                      <div className="font-pixel text-3xl text-secondary shrink-0 group-hover:scale-110 transition-transform">{step.n}</div>
                      <div className="w-full">
                        <h4 className="font-pixel text-lg text-primary mb-2">{step.title}</h4>
                        {step.body ? (
                          <p className="font-comic text-lg text-gray-300">{step.body}</p>
                        ) : (
                          <div className="bg-background p-3 rounded font-pixel text-xs text-secondary break-all flex justify-between items-center">
                            <span data-testid="text-howtobuy-ca">{CONTRACT_ADDRESS}</span>
                            <Button variant="ghost" size="icon" onClick={handleCopyHtb} className="text-primary hover:text-secondary shrink-0 ml-2" data-testid="button-howtobuy-copy">
                              {copiedHtb ? "✓" : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.3}>
              <div className="mt-16 text-center">
                <a href={UNISWAP_LINK} target="_blank" rel="noopener noreferrer" data-testid="link-howtobuy-letsgo">
                  <Button size="lg" className="font-pixel text-xl bg-primary text-primary-foreground hover:bg-secondary h-20 px-12 box-shadow-gold hover:scale-105 transition-transform" data-testid="button-howtobuy-letsgo">
                    LET'S GO <ArrowRight className="ml-4" />
                  </Button>
                </a>
              </div>
            </Reveal>
          </div>
        </section>

      </main>

      {/* ── Footer / Community ── */}
      <footer id="community" className="bg-card border-t-4 border-primary py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/doge-sun.jpg')] opacity-10 bg-cover bg-center" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Reveal>
            <h2 className="font-pixel text-3xl md:text-4xl text-primary mb-12 text-shadow-gold">
              SUCH COMMUNITY. MANY FRENS.
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              <a href="https://x.com/Dogcerc" target="_blank" rel="noopener noreferrer" data-testid="link-footer-x">
                <Button className="font-pixel bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-14 px-6 text-xs hover:box-shadow-gold transition-all" data-testid="button-footer-x">
                  🐦 Follow on X <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" data-testid="link-footer-tg">
                <Button className="font-pixel bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-14 px-6 text-xs hover:box-shadow-gold transition-all" data-testid="button-footer-tg">
                  💬 Join Telegram <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <a href={DEXSCREENER_LINK} target="_blank" rel="noopener noreferrer" data-testid="link-footer-dex">
                <Button className="font-pixel bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-14 px-6 text-xs hover:box-shadow-gold transition-all" data-testid="button-footer-dex">
                  📊 DexScreener <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </Reveal>

          <p className="font-comic text-lg text-gray-500">
            © 2024 ÐOGE CLASSIC — $DOGC. Much wow.
          </p>
        </div>
      </footer>
    </div>
  );
}
