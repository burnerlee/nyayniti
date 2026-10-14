import React, { useState } from 'react';
import { Check, Link2, Linkedin, Mail, MessageCircle, Share2, Twitter, Facebook } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

const btn =
  'inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:text-white hover:bg-gold hover:border-gold transition-colors';

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
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
      // Clipboard API needs https/permission; fall back to a temporary textarea.
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = typeof navigator !== 'undefined' && 'share' in navigator;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className="text-sm font-medium text-gray-700 mr-1">Share this post</span>
      {nativeShare && (
        <button
          type="button"
          className={btn}
          aria-label="Share"
          onClick={() => navigator.share({ title, url }).catch(() => undefined)}
        >
          <Share2 size={18} />
        </button>
      )}
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className={btn}
          aria-label={`Share on ${label}`}
          title={`Share on ${label}`}
        >
          <Icon size={18} />
        </a>
      ))}
      <button type="button" className={btn} aria-label="Copy link" title="Copy link" onClick={copy}>
        {copied ? <Check size={18} /> : <Link2 size={18} />}
      </button>
      <span className="text-sm text-gray-500 w-14" role="status" aria-live="polite">
        {copied ? 'Copied!' : ''}
      </span>
    </div>
  );
};

export default ShareButtons;
