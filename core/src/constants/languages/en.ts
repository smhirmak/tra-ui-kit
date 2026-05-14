const en = {
  // Corporate Standards card bodies (Trans component – <code> = components.code)
  CorporateStandardsCard1:
    'The template created with <code>npx @tra-bilisim/tra-ui create</code> is the base starting point. No blank Vite projects are opened. This ensures the same folder structure, tooling, and provider hierarchy across all projects.',
  CorporateStandardsCard2:
    'Only Tailwind CSS v4 utility classes are used for component styling. Theme colors and design tokens are taken from the TRA theme configuration installed with <code>npx @tra-bilisim/tra-ui init</code>; hardcoded color values are not used.',
  CorporateStandardsCard3:
    'All pages are defined as file-based routes under the <code>src/routes/</code> folder. <code>routeTree.gen.ts</code> is auto-generated and must not be edited manually. It is used together with TanStack Query for loaders and context.',
  CorporateStandardsCard4:
    'All API calls go through the <code>createService</code> factory. Direct <code>fetch</code> or raw <code>axios</code> calls are not made; interceptor and token management is handled from the central configuration.',
  CorporateStandardsCard5:
    'Applications start with Turkish / English support. Type-safe message catalogs are used via the <code>useM()</code> hook. No hardcoded TR/EN text is left; all UI texts are defined in the message catalog.',
  CorporateStandardsCard6:
    'Before writing a new component, it is checked whether TRA UI Kit already has one serving the same purpose. Existing components are added to the project with <code>npx @tra-bilisim/tra-ui add</code> and used directly — no copy-paste.',
};

export default en;
