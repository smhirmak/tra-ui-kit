import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Sidebar, { SidebarItem } from '../sidebar';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock LocalizeContext
vi.mock('@/contexts/locale/LocalizeContext', () => ({
  useLocalizeContext: () => ({
    t: (key: string) => key,
  }),
}));

describe('Sidebar', () => {
  const TestIcon = <span data-testid="test-icon">Icon</span>;

  describe('Rendering', () => {
    it('should render sidebar container', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Home" />
          </Sidebar>
        </BrowserRouter>,
      );
      expect(container.querySelector('aside')).toBeInTheDocument();
      expect(container.querySelector('nav')).toBeInTheDocument();
    });

    it('should render sidebar items', () => {
      render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Home" />
            <SidebarItem icon={TestIcon} text="Profile" />
          </Sidebar>
        </BrowserRouter>,
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should render header logo when provided', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar headerLogo="/logo.png">
            <SidebarItem icon={TestIcon} text="Home" />
          </Sidebar>
        </BrowserRouter>,
      );

      const logo = container.querySelector('img[alt="logo"]');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/logo.png');
    });

    it('should not render logo when not provided', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Home" />
          </Sidebar>
        </BrowserRouter>,
      );

      expect(container.querySelector('img[alt="logo"]')).not.toBeInTheDocument();
    });
  });

  describe('Expand/Collapse Functionality', () => {
    it('should start in expanded state by default', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar headerLogo="/logo.png">
            <SidebarItem icon={TestIcon} text="Home" />
          </Sidebar>
        </BrowserRouter>,
      );

      const logo = container.querySelector('img[alt="logo"]');
      expect(logo).toHaveClass('w-16');
    });

    it('should toggle expanded state when clicking toggle button', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <BrowserRouter>
          <Sidebar headerLogo="/logo.png">
            <SidebarItem icon={TestIcon} text="Home" />
          </Sidebar>
        </BrowserRouter>,
      );

      const toggleButton = container.querySelector('button');
      const logo = container.querySelector('img[alt="logo"]');

      expect(logo).toHaveClass('w-16');

      if (toggleButton) {
        await user.click(toggleButton);
      }

      expect(logo).toHaveClass('w-0');
    });

    it('should show/hide item text based on expanded state', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Home" />
          </Sidebar>
        </BrowserRouter>,
      );

      const toggleButton = container.querySelector('button');
      const itemText = screen.getByText('Home');

      expect(itemText).toHaveClass('ml-3', 'w-40');

      if (toggleButton) {
        await user.click(toggleButton);
      }

      expect(itemText).toHaveClass('size-0');
    });
  });

  describe('SidebarItem Features', () => {
    it('should render item icon', () => {
      render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Home" />
          </Sidebar>
        </BrowserRouter>,
      );

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should apply active styling when active prop is true', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Home" active />
          </Sidebar>
        </BrowserRouter>,
      );

      const item = container.querySelector('li');
      expect(item).toHaveClass('bg-gradient-to-tr', 'from-indigo-200', 'to-indigo-100', 'text-indigo-800');
    });

    it('should apply hover styling when not active', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Home" />
          </Sidebar>
        </BrowserRouter>,
      );

      const item = container.querySelector('li');
      expect(item).toHaveClass('hover:bg-gray-300');
    });

    it('should show alert indicator when alert prop is true', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Home" alert />
          </Sidebar>
        </BrowserRouter>,
      );

      const alertDot = container.querySelector('.size-2.rounded.bg-indigo-400');
      expect(alertDot).toBeInTheDocument();
    });

    it('should not show alert indicator when alert prop is false', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Home" />
          </Sidebar>
        </BrowserRouter>,
      );

      const alertDot = container.querySelector('.size-2.rounded.bg-indigo-400');
      expect(alertDot).not.toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should navigate to URL when item is clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Home" url="/home" />
          </Sidebar>
        </BrowserRouter>,
      );

      const item = container.querySelector('li') as HTMLElement;
      await user.click(item);

      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });

    it('should not navigate when URL is not provided', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Home" />
          </Sidebar>
        </BrowserRouter>,
      );

      mockNavigate.mockClear();
      const item = container.querySelector('li') as HTMLElement;
      await user.click(item);

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('Tooltip on Collapsed State', () => {
    it('should show tooltip when sidebar is collapsed', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Settings" />
          </Sidebar>
        </BrowserRouter>,
      );

      const toggleButton = container.querySelector('button');

      // Collapse sidebar
      if (toggleButton) {
        await user.click(toggleButton);
      }

      // Check for tooltip element
      const tooltip = container.querySelector('.invisible.absolute.left-full');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent('Settings');
    });

    it('should not show tooltip when sidebar is expanded', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Settings" />
          </Sidebar>
        </BrowserRouter>,
      );

      // When expanded, tooltip element still exists but text width is not 0
      const itemText = screen.getByText('Settings');
      expect(itemText).toHaveClass('w-40');
      expect(itemText).not.toHaveClass('size-0');
    });
  });

  describe('Localization', () => {
    it('should translate item text using t function', () => {
      render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="home.title" />
          </Sidebar>
        </BrowserRouter>,
      );

      // Since mock returns the key itself, it should render "home.title"
      expect(screen.getByText('home.title')).toBeInTheDocument();
    });
  });

  describe('Sticky Positioning', () => {
    it('should have sticky positioning', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Home" />
          </Sidebar>
        </BrowserRouter>,
      );

      const aside = container.querySelector('aside');
      expect(aside).toHaveClass('sticky', 'top-0');
    });
  });

  describe('Context Validation', () => {
    it('should throw error when SidebarItem is used outside Sidebar', () => {
      // Suppress console.error for this test
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => { });

      expect(() => {
        render(
          <BrowserRouter>
            <SidebarItem icon={TestIcon} text="Home" />
          </BrowserRouter>,
        );
      }).toThrow('SidebarItem must be used within a Sidebar');

      consoleError.mockRestore();
    });
  });

  describe('Layout Adjustments', () => {
    it('should adjust header layout when logo is present and expanded', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar headerLogo="/logo.png">
            <SidebarItem icon={TestIcon} text="Home" />
          </Sidebar>
        </BrowserRouter>,
      );

      const header = container.querySelector('.flex.items-center');
      expect(header).toHaveClass('justify-between');
    });

    it('should adjust header layout when logo is not present', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Home" />
          </Sidebar>
        </BrowserRouter>,
      );

      const header = container.querySelector('.flex.items-center');
      expect(header).toHaveClass('justify-end');
    });

    it('should adjust header layout when collapsed even with logo', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <BrowserRouter>
          <Sidebar headerLogo="/logo.png">
            <SidebarItem icon={TestIcon} text="Home" />
          </Sidebar>
        </BrowserRouter>,
      );

      const toggleButton = container.querySelector('button');

      // Initially should be justify-between
      let header = container.querySelector('.flex.items-center');
      expect(header).toHaveClass('justify-between');

      // After collapse should be justify-end (logo width becomes 0)
      if (toggleButton) {
        await user.click(toggleButton);
      }

      header = container.querySelector('.flex.items-center');
      expect(header).toHaveClass('justify-end');
    });
  });

  describe('Multiple Items', () => {
    it('should render multiple sidebar items with mixed states', () => {
      const { container } = render(
        <BrowserRouter>
          <Sidebar>
            <SidebarItem icon={TestIcon} text="Home" active />
            <SidebarItem icon={TestIcon} text="Profile" alert />
            <SidebarItem icon={TestIcon} text="Settings" />
          </Sidebar>
        </BrowserRouter>,
      );

      const items = container.querySelectorAll('li');
      expect(items).toHaveLength(3);

      // First item should be active
      expect(items[0]).toHaveClass('bg-gradient-to-tr');

      // Second item should have alert
      const alertDot = items[1].querySelector('.size-2.rounded.bg-indigo-400');
      expect(alertDot).toBeInTheDocument();
    });
  });
});
