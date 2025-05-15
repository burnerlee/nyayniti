import React from 'react';

const mediaArticles = [
  {
    image: "https://www.livelaw.in/h-upload/2024/05/04/750x450_537820-section-498a-sc.webp",
    title: "S.498A IPC Often Used Against Husband & His Family To Meet Wife's Unreasonable Demands: SC",
    source: "Live Law",
    logo: "https://static.livelaw.in/logo.png",
    url: "https://www.livelaw.in/supreme-court/s498a-ipc-often-used-against-husband-his-family-to-meet-wifes-unreasonable-demands-growing-tendency-of-misuse-supreme-court-277919"
  },
  {
    image: "https://images.indianexpress.com/2024/12/supreme-court-6_20241211115833.jpg",
    title: "Supreme Court Criticises 'growing Misuse' Of IPC Section 498A Against Husbands And Their Kin",
    source: "The Indian Express",
    logo: "https://images.indianexpress.com/2022/03/indian-express-logo.png",
    url: "https://indianexpress.com/article/india/supreme-court-criticises-misuse-ipc-section-498a-husbands-kin-9719169/"
  },
  {
    image: "https://www.hindustantimes.com/ht-img/img/2024/12/10/550x309/The-Supreme-Court-bench-highlighted-the-misuse-of-_1733856617021.jpg",
    title: "SC Criticises Misuse Of Anti-Dowry Legislation For 'personal Vendetta'",
    source: "Hindustan Times",
    logo: "https://www.hindustantimes.com/res/images/ht-logo.svg",
    url: "https://www.hindustantimes.com/india-news/sc-criticises-misuse-of-anti-dowry-legislation-for-personal-vendetta-101733856625146.html"
  },
  {
    image: "https://media.assettype.com/barandbench%2F2022-10%2F891dda2a-0e4a-4ea9-8bf2-86a1217b2880%2F40.jpg",
    title: "Section 498A Being Misused To Force Husband To Comply With Wife's Unreasonable Demands: SC",
    source: "Bar & Bench",
    logo: "https://www.barandbench.com/theme/images/logo.png",
    url: "https://www.barandbench.com/news/section-498a-being-misused-force-husband-comply-wifes-unreasonable-demands-supreme-court"
  }
];

const MediaSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-12">
        {/* Desktop layout (hidden on mobile) */}
        <div className="hidden md:flex md:flex-row md:justify-between">
          <div className="flex flex-col w-2/5 justify-center">
            <div className="flex items-center mb-6">
              <div className="w-12 h-0.5 bg-yellow-600 mr-4"></div>
              <h2 className="text-3xl font-playfair">Media</h2>
            </div>
            <p className="text-gray-600">
              Featured in top publications for legal insights and expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 w-3/5">
            {mediaArticles.map((article, index) => (
              <a 
                key={index} 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative overflow-hidden block cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute top-4 left-4">
                  <img 
                    src={article.logo} 
                    alt={article.source} 
                    className="h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const textElement = document.createElement('div');
                        textElement.className = 'bg-white text-black px-3 py-1 font-bold text-sm';
                        textElement.textContent = article.source;
                        parent.appendChild(textElement);
                      }
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-medium leading-tight mb-2">{article.title}</h3>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-sm bg-gold px-3 py-1 inline-block">Read Article</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile layout (hidden on desktop) */}
        <div className="md:hidden">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-8 h-0.5 bg-yellow-600 mr-3"></div>
              <h2 className="text-2xl font-playfair">Media</h2>
            </div>
            <p className="text-gray-600">
              Featured in top publications for legal insights and expertise.
            </p>
          </div>
          
          <div className="space-y-6">
            {mediaArticles.map((article, index) => (
              <a 
                key={index} 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative overflow-hidden block cursor-pointer transition-transform duration-300 hover:shadow-lg"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute top-3 left-3">
                  <div className="bg-white text-black px-2 py-1 font-bold text-xs">
                    {article.source}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white text-base font-medium leading-tight mb-2">{article.title}</h3>
                  <span className="text-white text-xs bg-gold px-2 py-1 inline-block">Read Article</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
