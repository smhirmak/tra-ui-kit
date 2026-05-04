/**
 * Dynamically imports and returns the raw source code of a component file
 * @param componentName - The name of the component (e.g., 'accordion', 'button')
 * @returns Promise with the component source code as string
 */
export const getComponentSource = async (componentName: string): Promise<string> => {
  try {
    // Import the raw source using Vite's ?raw suffix
    const source = await import(`../../registry/tra-kit/components/${componentName}.tsx?raw`);
    return source.default;
  } catch (error) {
    console.error(`Failed to load source for component: ${componentName}`, error);
    return `// Error loading source code for ${componentName}`;
  }
};
