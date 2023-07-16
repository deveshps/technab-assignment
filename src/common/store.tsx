import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';

export const toastMessage = new BehaviorSubject<string | null>(null);

export const useToast = () => {
    const [value, setValue] = useState<string | null>(toastMessage.value);
  
    useEffect(() => {
      const subs = toastMessage.subscribe((value) => setValue(value));
      return () => subs.unsubscribe();
    }, []);
  
    return [value];
  };