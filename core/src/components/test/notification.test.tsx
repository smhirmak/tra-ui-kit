import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import Notification from '../ui/notification';
import { NotificationProvider } from '@/contexts/notification/NotificationProvider';

// Wrapper component for testing
const NotificationWrapper = ({ children }: { children: ReactNode }) => (
  <NotificationProvider>{children}</NotificationProvider>
);

describe('Notification', () => {
  describe('Hook Usage', () => {
    it('should return notification methods', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(result.current.info).toBeDefined();
      expect(result.current.error).toBeDefined();
      expect(result.current.success).toBeDefined();
      expect(result.current.warn).toBeDefined();
    });

    it('should have info method as function', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(typeof result.current.info).toBe('function');
    });

    it('should have error method as function', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(typeof result.current.error).toBe('function');
    });

    it('should have success method as function', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(typeof result.current.success).toBe('function');
    });

    it('should have warn method as function', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(typeof result.current.warn).toBe('function');
    });
  });

  describe('Method Calls', () => {
    it('should call info method without errors', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(() => {
        result.current.info('Test info message');
      }).not.toThrow();
    });

    it('should call error method without errors', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(() => {
        result.current.error('Test error message');
      }).not.toThrow();
    });

    it('should call success method without errors', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(() => {
        result.current.success('Test success message');
      }).not.toThrow();
    });

    it('should call warn method without errors', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(() => {
        result.current.warn('Test warning message');
      }).not.toThrow();
    });
  });

  describe('Options Support', () => {
    it('should accept options for info', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(() => {
        result.current.info('Test', { autoClose: false, autoCloseTime: 5000 });
      }).not.toThrow();
    });

    it('should accept undefined options', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(() => {
        result.current.info('Test', undefined);
      }).not.toThrow();
    });
  });

  describe('Message Formats', () => {
    it('should handle string message', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(() => {
        result.current.info('Simple string');
      }).not.toThrow();
    });

    it('should handle array message', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(() => {
        result.current.info(['Message 1', 'Message 2']);
      }).not.toThrow();
    });

    it('should handle empty string', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(() => {
        result.current.info('');
      }).not.toThrow();
    });

    it('should handle empty array', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(() => {
        result.current.info([]);
      }).not.toThrow();
    });
  });

  describe('All Notification Types', () => {
    it('should support all four notification types', () => {
      const { result } = renderHook(() => Notification(), {
        wrapper: NotificationWrapper,
      });

      expect(typeof result.current.info).toBe('function');
      expect(typeof result.current.error).toBe('function');
      expect(typeof result.current.success).toBe('function');
      expect(typeof result.current.warn).toBe('function');
    });
  });
});
