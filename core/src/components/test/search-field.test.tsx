import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchField from '../search-field';

describe('SearchField Component', () => {
  describe('Basic Rendering', () => {
    it('should render search input', () => {
      render(<SearchField value="" />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should render with placeholder', () => {
      render(
        <SearchField
          value=""
          placeholder="Search..."
        />,
      );
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(
        <SearchField
          value=""
          label="Search Items"
        />,
      );
      expect(screen.getByText('Search Items')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should call onChange when typing', () => {
      const onChange = vi.fn();
      render(
        <SearchField
          value=""
          onChange={onChange}
        />,
      );
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      expect(onChange).toHaveBeenCalled();
    });

    it('should update value when typing', () => {
      const { rerender } = render(
        <SearchField
          value=""
          onChange={vi.fn()}
        />,
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;

      rerender(
        <SearchField
          value="query"
          onChange={vi.fn()}
        />,
      );
      expect(input.value).toBe('query');
    });
  });

  describe('Search Icon', () => {
    it('should render search icon by default', () => {
      const { container } = render(<SearchField value="" />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(
        <SearchField
          value=""
          disabled
        />,
      );
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });
  });

  describe('Custom Styling', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <SearchField
          value=""
          className="custom-search"
        />,
      );
      expect(container.querySelector('.custom-search')).toBeInTheDocument();
    });
  });
});
