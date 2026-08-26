import { Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { useInView } from "../hooks/useInView";

interface LazySectionProps {
  component: LazyExoticComponent<ComponentType>;
  minHeight?: number;
}

/**
 * Defers both mounting AND the underlying dynamic import() of a below-the-fold
 * section until it's about to enter the viewport (React.lazy alone only code-splits
 * a component -- it still downloads immediately once rendered, so gating the render
 * itself behind IntersectionObserver is what actually delays the network request).
 */
export default function LazySection({ component: Component, minHeight = 480 }: LazySectionProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} style={inView ? undefined : { minHeight }}>
      {inView && (
        <Suspense fallback={null}>
          <Component />
        </Suspense>
      )}
    </div>
  );
}
