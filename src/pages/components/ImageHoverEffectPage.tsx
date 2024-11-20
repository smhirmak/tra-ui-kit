const ImageHoverEffectPage = () => (
  <div className="relative h-[175px] w-[250px] bg-[url('assets/logos/logo.png')] bg-contain bg-no-repeat transition-all after:opacity-0 after:transition-all after:ease-in-out hover:after:absolute hover:after:inset-0 hover:after:-z-1 hover:after:bg-inherit hover:after:bg-[url('assets/logos/logo.png')] hover:after:bg-contain hover:after:bg-no-repeat after:hover:opacity-100 hover:after:blur-lg" />
);

export default ImageHoverEffectPage;
