import { lazy, ComponentType } from 'react';

/**
 * Dynamically imports a versioned component
 * - For v0 (old versions): Load from versions folder
 * - For v1+ (latest): Load from components folder
 * 
 * @param version - Version string (e.g., '0', '1')
 * @param componentName - Component name in PascalCase (e.g., 'Button', 'Input')
 * @returns Lazy loaded component
 */
export const loadVersionedComponent = (version: string, componentName: string) => {
  const versionNum = parseInt(version);
  
  // Old versions from versions folder
  if (versionNum === 0) {
    return lazy(() =>
      import(`@/versions/v${version}/components/${componentName.toLowerCase()}.tsx`)
        .catch(() => {
          console.warn(`Component v${version}/${componentName} not found, using default`);
          return import(`@/components/${componentName.toLowerCase()}.tsx`);
        })
    );
  }
  
  // Latest version from components folder
  return lazy(() =>
    import(`@/components/${componentName.toLowerCase()}.tsx`)
  );
};

/**
 * Dynamically imports a versioned page component
 * @param version - Version string (e.g., '0', '1')
 * @param pageName - Page name in PascalCase (e.g., 'ButtonPage', 'InputPage')
 * @returns Lazy loaded page component
 */
export const loadVersionedPage = (version: string, pageName: string) => {
  return lazy(() =>
    import(`@/versions/v${version}/pages/${pageName}.tsx`)
      .catch(() => {
        // Fallback to default page if versioned one doesn't exist
        console.warn(`Versioned page v${version}/${pageName} not found, using default`);
        return import(`@/pages/components/${pageName}.tsx`);
      })
  );
};

/**
 * Synchronously gets the correct component path for a version
 * Use this for direct imports with dynamic version
 */
export const getVersionedComponentPath = (version: string, componentName: string): string => {
  return `@/versions/v${version}/components/${componentName.toLowerCase()}`;
};

/**
 * Synchronously gets the correct page path for a version
 */
export const getVersionedPagePath = (version: string, pageName: string): string => {
  return `@/versions/v${version}/pages/${pageName}`;
};
