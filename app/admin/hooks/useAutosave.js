import { useEffect, useRef, useCallback, useState } from 'react';
import { toast } from 'sonner';

export function useAutosave({
  data,
  onSave,
  interval = 30000, // 30 seconds
  enabled = true,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const timeoutRef = useRef(null);
  const previousDataRef = useRef(data);

  const save = useCallback(async () => {
    if (!enabled || isSaving) return;

    // Check if data has actually changed
    if (JSON.stringify(data) === JSON.stringify(previousDataRef.current)) {
      return;
    }

    setIsSaving(true);
    try {
      await onSave(data);
      setLastSaved(new Date());
      previousDataRef.current = data;
      
      // Show subtle toast
      toast.success('Draft saved', {
        duration: 2000,
        className: 'text-xs',
      });
    } catch (error) {
      console.error('Autosave failed:', error);
      toast.error('Failed to save draft', {
        duration: 2000,
      });
    } finally {
      setIsSaving(false);
    }
  }, [data, onSave, enabled, isSaving]);

  useEffect(() => {
    if (!enabled) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      save();
    }, interval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, save, interval, enabled]);

  // Save before unload
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (e) => {
      if (JSON.stringify(data) !== JSON.stringify(previousDataRef.current)) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [data, enabled]);

  const getTimeSinceLastSave = useCallback(() => {
    if (!lastSaved) return null;

    const seconds = Math.floor((new Date() - lastSaved) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  }, [lastSaved]);

  return {
    isSaving,
    lastSaved,
    getTimeSinceLastSave,
    forceSave: save,
  };
}
