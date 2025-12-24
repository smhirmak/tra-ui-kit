import { createContext, useContext, useState, ReactNode } from 'react';
import { TOCItem } from '@/components/table-of-contents';

interface TOCContextType {
  tocItems: TOCItem[];
  setTocItems: (items: TOCItem[]) => void;
}

const TOCContext = createContext<TOCContextType | undefined>(undefined);

export const TOCProvider = ({ children }: { children: ReactNode }) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);

  return (
    <TOCContext.Provider value={{ tocItems, setTocItems }}>
      {children}
    </TOCContext.Provider>
  );
};

export const useTOC = () => {
  const context = useContext(TOCContext);
  if (!context) {
    throw new Error('useTOC must be used within TOCProvider');
  }
  return context;
};
