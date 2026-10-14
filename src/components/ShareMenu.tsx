import React, { useEffect, useRef, useState } from 'react';
import { Check, Facebook, Link2, Linkedin, Mail, MessageCircle, Share2, Twitter } from 'lucide-react';

interface ShareMenuProps {
  url: string;
  title: string;
}

// Compact share control for cards: one icon button that opens a small menu above it.
const ShareMenu: React.FC<ShareMenuProps> = ({ url, title }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const items = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}`, Icon: MessageCircle },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: Linkedin },
    { label: 'X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, Icon: Twitter },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: Facebook },
    { label: 'Email', href: `mailto:?subject=${t}&body=${u}`, Icon: Mail },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1200);
  };

  const onClick = () => {
    // On phones the native sheet is better than our menu.
    if (typeof navigator !== 'undefined' && 'share' in navigator && window.matchMedia('(pointer: coarse)').matches) {
      navigator.share({ title, url }).catch(() => undefined);
      return;
    }
    setOpen((o) => !o);
  };

  const item = 'flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gold transition-colors';

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={onClick}
        aria-label={`Share "${title}"`}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:text-white hover:bg-gold hover:border-gold transition-colors"
      >
        <Share2 size={15} />
      </button>
      {open && (
        <div role="menu" className="absolute bottom-full right-0 mb-2 w-44 bg-white border border-gray-200 shadow-lg z-20">
          {items.map(({ label, href, Icon }) => (
            <a
              key={label}
              role="menuitem"
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className={item}
              onClick={() => setOpen(false)}
            >
              <Icon size={16} className="mr-3" /> {label}
            </a>
          ))}
          <button type="button" role="menuitem" onClick={copy} className={item}>
            {copied ? <Check size={16} className="mr-3" /> : <Link2 size={16} className="mr-3" />}
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareMenu;
