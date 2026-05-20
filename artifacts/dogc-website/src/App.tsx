import React, { useState, useEffect } from "react";
import { Copy, Menu, X, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONTRACT_ADDRESS = "0x20130bc88cb8dae42a7a987b1377a97471e1ae9a";
const UNISWAP_LINK = `https://app.uniswap.org/swap?outputCurrency=${CONTRACT_ADDRESS}&chain=ethereum`;
const DEXSCREENER_LINK = `https://dexscreener.com/ethereum/0xfbd9803a10f5a311eb00daadd84c3d5bb1f5f431`;

const FloatingDogePhrase = ({ phrase, style }: { phrase: string, style: React.CSSProperties }) => (
  <div 
    className="absolute font-comic text-primary font-bold opacity-30 pointer-events-none text-xl md:text-3xl z-0"
    style={style}
  >
    {phrase}
  </div>
);

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCA = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur border-b-4 border-primary px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="font-pixel text-primary md:text-xl text-lg cursor-pointer" onClick={() => scrollTo('home')} data-testid="link-home-logo">
          ÐOGC CLASSIC
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 font-pixel text-xs">
          <button onClick={() => scrollTo('home')} className="hover:text-primary transition-colors" data-testid="link-desktop-home">HOME</button>
          <button onClick={() => scrollTo('about')} className="hover:text-primary transition-colors" data-testid="link-desktop-about">ABOUT</button>
          <button onClick={() => scrollTo('tokenomics')} className="hover:text-primary transition-colors" data-testid="link-desktop-tokenomics">TOKENOMICS</button>
          <button onClick={() => scrollTo('howtobuy')} className="hover:text-primary transition-colors" data-testid="link-desktop-howtobuy">HOW TO BUY</button>
          <button onClick={() => scrollTo('community')} className="hover:text-primary transition-colors" data-testid="link-desktop-community">COMMUNITY</button>
          
          <a href={UNISWAP_LINK} target="_blank" rel="noopener noreferrer" data-testid="link-desktop-buynow">
            <Button className="font-pixel bg-primary text-primary-foreground hover:bg-secondary animate-blink box-shadow-gold" data-testid="button-desktop-buynow">
              BUY NOW
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-testid="button-mobile-menu-toggle">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-[72px] left-0 w-full bg-background border-b-4 border-primary flex flex-col font-pixel text-center text-sm z-40">
          <button onClick={() => scrollTo('home')} className="py-4 border-b border-primary/20" data-testid="link-mobile-home">HOME</button>
          <button onClick={() => scrollTo('about')} className="py-4 border-b border-primary/20" data-testid="link-mobile-about">ABOUT</button>
          <button onClick={() => scrollTo('tokenomics')} className="py-4 border-b border-primary/20" data-testid="link-mobile-tokenomics">TOKENOMICS</button>
          <button onClick={() => scrollTo('howtobuy')} className="py-4 border-b border-primary/20" data-testid="link-mobile-howtobuy">HOW TO BUY</button>
          <button onClick={() => scrollTo('community')} className="py-4 border-b border-primary/20" data-testid="link-mobile-community">COMMUNITY</button>
          <a href={UNISWAP_LINK} target="_blank" rel="noopener noreferrer" className="py-4 text-primary animate-blink" data-testid="link-mobile-buynow">
            BUY NOW
          </a>
        </div>
      )}

      <main className="pt-20">
        
        {/* Hero Section */}
        <section id="home" className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden py-20">
          <div className="starburst"></div>
          
          <FloatingDogePhrase phrase="such wow" style={{ top: '15%', left: '10%', transform: 'rotate(-15deg)' }} />
          <FloatingDogePhrase phrase="very crypto" style={{ top: '25%', right: '15%', transform: 'rotate(20deg)' }} />
          <FloatingDogePhrase phrase="much moon" style={{ bottom: '30%', left: '20%', transform: 'rotate(-5deg)' }} />
          <FloatingDogePhrase phrase="many gainz" style={{ bottom: '20%', right: '10%', transform: 'rotate(15deg)' }} />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <img 
              src="/assets/hero-main.jpg" 
              alt="DOGC Hero" 
              className="w-full max-w-lg mb-8 rounded-xl border-4 border-primary box-shadow-gold transform hover:scale-105 transition-transform duration-300" 
            />
            
            <h1 className="font-pixel text-4xl md:text-6xl text-primary mb-4 text-shadow-gold leading-tight">
              ÐOGE CLASSIC
            </h1>
            <h2 className="font-pixel text-2xl md:text-3xl text-secondary mb-6">
              $DOGC
            </h2>
            <h3 className="font-pixel text-xl md:text-2xl mb-8">
              SUCH REVIVAL. MUCH OG.
            </h3>
            
            <p className="font-comic text-xl md:text-2xl max-w-2xl mb-10 text-gray-300">
              The original Dogecoin spirit is back. Community-owned. LP burned. Since 2013.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <a href={UNISWAP_LINK} target="_blank" rel="noopener noreferrer" data-testid="link-hero-buy">
                <Button size="lg" className="w-full sm:w-auto font-pixel text-lg bg-primary text-primary-foreground hover:bg-secondary h-16 px-8 hover:box-shadow-gold transition-all" data-testid="button-hero-buy">
                  BUY $DOGC
                </Button>
              </a>
              <a href={DEXSCREENER_LINK} target="_blank" rel="noopener noreferrer" data-testid="link-hero-chart">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-pixel text-lg border-4 border-primary text-primary hover:bg-primary/20 h-16 px-8" data-testid="button-hero-chart">
                  CHART
                </Button>
              </a>
            </div>

            <div className="bg-card border-4 border-dotted-gold p-4 rounded-xl flex flex-col sm:flex-row items-center gap-4">
              <span className="font-pixel text-xs md:text-sm text-primary break-all" data-testid="text-ca-address">CA: {CONTRACT_ADDRESS}</span>
              <Button 
                onClick={handleCopyCA} 
                variant="secondary" 
                className="font-pixel text-xs bg-secondary text-secondary-foreground"
                data-testid="button-copy-ca"
              >
                {copied ? "COPIED! WOW" : <><Copy className="w-4 h-4 mr-2" /> COPY</>}
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-24 px-4 bg-[url('/assets/doge-dark.jpg')] bg-cover bg-center bg-fixed">
          <div className="absolute inset-0 bg-background/90"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <h2 className="font-pixel text-3xl md:text-5xl text-primary text-center mb-16 text-shadow-gold">
              SUCH HISTORY. VERY OG.
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="flex justify-center relative">
                <img 
                  src="/assets/dogc-coin.png" 
                  alt="DOGC Coin" 
                  className="w-64 h-64 md:w-96 md:h-96 object-contain animate-spin-float"
                />
              </div>
              <div className="font-comic text-xl md:text-2xl leading-relaxed text-gray-200">
                <p className="mb-6">
                  ÐOGE CLASSIC is a community takeover of the original Dogecoin spirit — back to December 2013.
                </p>
                <p className="mb-6">
                  Before the sells. Before the noise. Just OGs, holding, believing.
                </p>
                <p>
                  Being OG isn't everyone's cup of tea. You gotta be resilient. This is for the holders, the believers, the ones who never left.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 border-4 border-dashed border-primary hover:box-shadow-gold transition-all transform hover:-translate-y-2">
                <h3 className="font-pixel text-xl text-primary mb-4">LP BURNED</h3>
                <p className="font-comic text-lg text-gray-300">Liquidity locked forever. Rug-proof. Community owns this.</p>
              </div>
              <div className="bg-card p-8 border-4 border-dashed border-primary hover:box-shadow-gold transition-all transform hover:-translate-y-2">
                <h3 className="font-pixel text-xl text-primary mb-4">COMMUNITY TAKEOVER</h3>
                <p className="font-comic text-lg text-gray-300">No dev wallet. No presale. Pure community.</p>
              </div>
              <div className="bg-card p-8 border-4 border-dashed border-primary hover:box-shadow-gold transition-all transform hover:-translate-y-2">
                <h3 className="font-pixel text-xl text-primary mb-4">ETHEREUM CHAIN</h3>
                <p className="font-comic text-lg text-gray-300">Live on Uniswap V2. Buy directly on-chain.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tokenomics Section */}
        <section id="tokenomics" className="relative py-24 px-4 bg-[url('/assets/dogc-chart.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h2 className="font-pixel text-3xl md:text-5xl text-primary mb-16 text-shadow-gold">
              WOW SUCH TOKENOMICS
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-card/80 p-6 border-2 border-primary rounded-lg flex flex-col items-center justify-center">
                <span className="font-comic text-lg text-gray-400 mb-2">Ticker</span>
                <span className="font-pixel text-2xl text-secondary">$DOGC</span>
              </div>
              <div className="bg-card/80 p-6 border-2 border-primary rounded-lg flex flex-col items-center justify-center">
                <span className="font-comic text-lg text-gray-400 mb-2">Chain</span>
                <span className="font-pixel text-lg md:text-xl text-secondary">Ethereum</span>
              </div>
              <div className="bg-card/80 p-6 border-2 border-primary rounded-lg flex flex-col items-center justify-center">
                <span className="font-comic text-lg text-gray-400 mb-2">LP</span>
                <span className="font-pixel text-xl text-destructive text-shadow-gold">BURNED</span>
              </div>
              <div className="bg-card/80 p-6 border-2 border-primary rounded-lg flex flex-col items-center justify-center">
                <span className="font-comic text-lg text-gray-400 mb-2">Tax</span>
                <span className="font-pixel text-lg text-secondary">0% / 0%</span>
              </div>
            </div>
            
            <img src="/assets/dogc-coin2.jpg" alt="DOGC Extra" className="w-32 h-32 mx-auto rounded-full border-4 border-primary mb-8" />
          </div>
        </section>

        {/* How To Buy Section */}
        <section id="howtobuy" className="py-24 px-4 bg-background relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/assets/coins-texture.jpg')] bg-repeat"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="font-pixel text-3xl md:text-5xl text-primary text-center mb-16 text-shadow-gold">
              HOW MUCH BUY. VERY EASY.
            </h2>

            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/3">
                <img 
                  src="/assets/doge-sunglasses.jpg" 
                  alt="Cool Doge" 
                  className="w-full rounded-2xl border-4 border-primary box-shadow-gold"
                />
              </div>
              
              <div className="md:w-2/3 space-y-6">
                <div className="bg-card p-6 border-l-4 border-primary flex gap-4 items-start">
                  <div className="font-pixel text-3xl text-secondary">1</div>
                  <div>
                    <h4 className="font-pixel text-xl text-primary mb-2">Get ETH</h4>
                    <p className="font-comic text-lg text-gray-300">Buy ETH on any exchange and send to your wallet (MetaMask, Rabby, etc.)</p>
                  </div>
                </div>
                
                <div className="bg-card p-6 border-l-4 border-primary flex gap-4 items-start">
                  <div className="font-pixel text-3xl text-secondary">2</div>
                  <div>
                    <h4 className="font-pixel text-xl text-primary mb-2">Go to Uniswap</h4>
                    <p className="font-comic text-lg text-gray-300">Visit Uniswap V2 and connect your wallet</p>
                  </div>
                </div>
                
                <div className="bg-card p-6 border-l-4 border-primary flex gap-4 items-start">
                  <div className="font-pixel text-3xl text-secondary">3</div>
                  <div className="w-full">
                    <h4 className="font-pixel text-xl text-primary mb-2">Paste CA</h4>
                    <div className="bg-background p-3 rounded font-pixel text-xs text-secondary break-all flex justify-between items-center">
                      <span data-testid="text-howtobuy-ca">{CONTRACT_ADDRESS}</span>
                      <Button variant="ghost" size="icon" onClick={handleCopyCA} className="text-primary hover:text-secondary" data-testid="button-howtobuy-copy">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card p-6 border-l-4 border-primary flex gap-4 items-start">
                  <div className="font-pixel text-3xl text-secondary">4</div>
                  <div>
                    <h4 className="font-pixel text-xl text-primary mb-2">Swap & HODL</h4>
                    <p className="font-comic text-lg text-gray-300">Set slippage to 1-3%, swap ETH for $DOGC and join the OGs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <a href={UNISWAP_LINK} target="_blank" rel="noopener noreferrer" data-testid="link-howtobuy-letsgo">
                <Button size="lg" className="font-pixel text-xl bg-primary text-primary-foreground hover:bg-secondary h-20 px-12 box-shadow-gold hover:scale-105 transition-transform" data-testid="button-howtobuy-letsgo">
                  LET'S GO <ArrowRight className="ml-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer / Community */}
      <footer id="community" className="bg-card border-t-4 border-primary py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/doge-sun.jpg')] opacity-10 bg-cover bg-center"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-pixel text-3xl md:text-4xl text-primary mb-12 text-shadow-gold">
            SUCH COMMUNITY. MANY FRENS.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <a href="https://x.com/Dogcerc" target="_blank" rel="noopener noreferrer" data-testid="link-footer-x">
              <Button className="font-pixel bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-14 px-6 text-sm" data-testid="button-footer-x">
                Follow on X <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" data-testid="link-footer-tg">
              <Button className="font-pixel bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-14 px-6 text-sm" data-testid="button-footer-tg">
                Join Telegram <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <a href={DEXSCREENER_LINK} target="_blank" rel="noopener noreferrer" data-testid="link-footer-dex">
              <Button className="font-pixel bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-14 px-6 text-sm" data-testid="button-footer-dex">
                DexScreener <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>

          <p className="font-comic text-lg text-gray-500">
            © 2024 ÐOGE CLASSIC — $DOGC | Not financial advice. Much wow.
          </p>
        </div>
      </footer>
    </div>
  );
}
