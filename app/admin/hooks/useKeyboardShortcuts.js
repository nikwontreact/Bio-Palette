import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useKeyboardShortcuts(customShortcuts = {}) {
  const router = useRouter();

  const handleKeyPress = useCallback((event) => {
    const { key, ctrlKey, metaKey, shiftKey, altKey } = event;
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modKey = isMac ? metaKey : ctrlKey;

    // Ignore if user is typing in an input/textarea
    const target = event.target;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      // Allow Ctrl+S even in inputs
      if (!(modKey && key === 's')) {
        return;
      }
    }

    // Global shortcuts
    const shortcuts = {
      // Navigation
      'g+d': () => router.push('/admin'),
      'g+h': () => router.push('/admin/hero'),
      'g+a': () => router.push('/admin/about'),
      'g+p': () => router.push('/admin/projects'),
      'g+m': () => router.push('/admin/submissions'),
      'g+s': () => router.push('/admin/settings'),
      'g+t': () => router.push('/admin/testimonials'),
      
      // Actions
      'n': () => {
        if (window.location.pathname.includes('/projects')) {
          router.push('/admin/projects/new');
        }
      },
      
      // Search
      '/': () => {
        event.preventDefault();
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="Search"]');
        if (searchInput) {
          searchInput.focus();
        }
      },
      
      // Help
      '?': () => {
        showShortcutsHelp();
      },
      
      ...customShortcuts,
    };

    // Handle Ctrl/Cmd + Key combinations
    if (modKey) {
      switch (key) {
        case 's':
          event.preventDefault();
          const saveButton = document.querySelector('button[type="submit"]');
          if (saveButton && !saveButton.disabled) {
            saveButton.click();
            toast.success('Saving...', { duration: 1000 });
          }
          break;
        case 'k':
          event.preventDefault();
          const searchInput = document.querySelector('input[type="search"], input[placeholder*="Search"]');
          if (searchInput) {
            searchInput.focus();
          }
          break;
        case 'b':
          event.preventDefault();
          router.back();
          break;
        default:
          break;
      }
      return;
    }

    // Handle single key shortcuts
    if (!modKey && !shiftKey && !altKey) {
      const shortcut = shortcuts[key];
      if (shortcut) {
        event.preventDefault();
        shortcut();
      }
    }
  }, [router, customShortcuts]);

  useEffect(() => {
    let keySequence = '';
    let sequenceTimer;

    const handleKeyDown = (event) => {
      // Handle key sequences (like 'g+d')
      if (!event.ctrlKey && !event.metaKey && !event.altKey) {
        keySequence += event.key;
        
        clearTimeout(sequenceTimer);
        sequenceTimer = setTimeout(() => {
          keySequence = '';
        }, 1000);

        // Check if sequence matches any shortcut
        const shortcuts = {
          'gd': () => router.push('/admin'),
          'gh': () => router.push('/admin/hero'),
          'ga': () => router.push('/admin/about'),
          'gp': () => router.push('/admin/projects'),
          'gm': () => router.push('/admin/submissions'),
          'gs': () => router.push('/admin/settings'),
          'gt': () => router.push('/admin/testimonials'),
        };

        const action = shortcuts[keySequence];
        if (action) {
          event.preventDefault();
          action();
          keySequence = '';
        }
      }

      handleKeyPress(event);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(sequenceTimer);
    };
  }, [handleKeyPress, router]);
}

function showShortcutsHelp() {
  const shortcuts = [
    { keys: ['g', 'd'], description: 'Go to Dashboard' },
    { keys: ['g', 'h'], description: 'Go to Hero' },
    { keys: ['g', 'a'], description: 'Go to About' },
    { keys: ['g', 'p'], description: 'Go to Projects' },
    { keys: ['g', 'm'], description: 'Go to Messages' },
    { keys: ['g', 's'], description: 'Go to Settings' },
    { keys: ['g', 't'], description: 'Go to Testimonials' },
    { keys: ['Ctrl', 'S'], description: 'Save changes' },
    { keys: ['Ctrl', 'K'], description: 'Search' },
    { keys: ['Ctrl', 'B'], description: 'Go back' },
    { keys: ['n'], description: 'New item (on list pages)' },
    { keys: ['/'], description: 'Focus search' },
    { keys: ['?'], description: 'Show this help' },
  ];

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const modKey = isMac ? '⌘' : 'Ctrl';

  const helpContent = shortcuts
    .map(({ keys, description }) => {
      const keyDisplay = keys.map(k => k === 'Ctrl' ? modKey : k).join(' + ');
      return `${keyDisplay}: ${description}`;
    })
    .join('\n');

  toast.info('Keyboard Shortcuts', {
    description: (
      <div className="space-y-1 text-xs font-mono">
        {shortcuts.map(({ keys, description }, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="text-slate-400">{description}</span>
            <div className="flex gap-1">
              {keys.map((k, j) => (
                <kbd key={j} className="kbd">
                  {k === 'Ctrl' ? modKey : k}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
    duration: 10000,
  });
}
