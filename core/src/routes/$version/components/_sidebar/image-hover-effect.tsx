import { createFileRoute } from '@tanstack/react-router';
import ImageHoverEffectPage from '@/pages/components/ImageHoverEffectPage';

export const Route = createFileRoute('/$version/components/_sidebar/image-hover-effect')({
  component: ImageHoverEffectPage,
});
