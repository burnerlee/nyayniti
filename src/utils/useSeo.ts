import { useEffect } from 'react';

// Keeps title/description in sync on client-side navigation; crawlers get the prerendered tags.
export function useSeo(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
