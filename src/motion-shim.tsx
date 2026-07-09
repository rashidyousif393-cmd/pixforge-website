import React from "react";

// Helper component for MotionConfig - simply passes children through
export const MotionConfig: React.FC<any> = ({ children }) => {
  return <>{children}</>;
};

// Helper component for AnimatePresence - simply passes children through
export const AnimatePresence: React.FC<any> = ({ children }) => {
  return <>{children}</>;
};

// Filter out motion-specific props to prevent React warnings on standard DOM elements
const filterMotionProps = (props: Record<string, any>) => {
  const cleanProps: Record<string, any> = {};
  const motionKeys = new Set([
    "initial",
    "animate",
    "exit",
    "transition",
    "variants",
    "whileHover",
    "whileTap",
    "viewport",
    "layout",
    "layoutId",
    "onAnimationStart",
    "onAnimationComplete",
    "custom",
  ]);

  for (const [key, value] of Object.entries(props)) {
    if (!motionKeys.has(key)) {
      cleanProps[key] = value;
    }
  }
  return cleanProps;
};

// Standard element creator
const createMotionComponent = (TagName: string) => {
  const Component = React.forwardRef<any, any>((props, ref) => {
    const cleanProps = filterMotionProps(props);
    return React.createElement(TagName, { ...cleanProps, ref });
  });
  Component.displayName = `motion.${TagName}`;
  return Component;
};

// Preset common tags for direct access
export const motion: Record<string, any> = {
  a: createMotionComponent("a"),
  button: createMotionComponent("button"),
  circle: createMotionComponent("circle"),
  div: createMotionComponent("div"),
  form: createMotionComponent("form"),
  h1: createMotionComponent("h1"),
  h2: createMotionComponent("h2"),
  p: createMotionComponent("p"),
  span: createMotionComponent("span"),
  img: createMotionComponent("img"),
  section: createMotionComponent("section"),
  li: createMotionComponent("li"),
  ul: createMotionComponent("ul"),
  nav: createMotionComponent("nav"),
  svg: createMotionComponent("svg"),
  path: createMotionComponent("path"),
  rect: createMotionComponent("rect"),
};

// Use Proxy to handle any dynamic elements/tags (e.g., motion.span, motion.header, etc.)
const motionProxy = new Proxy(motion, {
  get: (target, prop) => {
    if (typeof prop === "string") {
      if (!(prop in target)) {
        target[prop] = createMotionComponent(prop);
      }
      return target[prop];
    }
    return undefined;
  },
});

export default motionProxy;
