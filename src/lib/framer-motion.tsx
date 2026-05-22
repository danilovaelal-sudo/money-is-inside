"use client";

import React, {
  type CSSProperties,
  type ReactNode,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";

type MotionStyle = Record<string, string | number | Array<string | number>>;

interface MotionProps {
  initial?: MotionStyle;
  animate?: MotionStyle;
  exit?: MotionStyle;
  whileHover?: MotionStyle;
  whileTap?: MotionStyle;
  whileInView?: MotionStyle;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string;
  };
  viewport?: {
    once?: boolean;
    amount?: number;
  };
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const easeMap: Record<string, string> = {
  easeInOut: "ease-in-out",
  easeOut: "ease-out",
  easeIn: "ease-in",
  linear: "linear",
  ease: "ease"
};

function getLastValue(
  value: string | number | Array<string | number> | undefined
) {
  if (Array.isArray(value)) {
    return value[value.length - 1];
  }

  return value;
}

function toTransform(style: MotionStyle | undefined) {
  if (!style) {
    return undefined;
  }

  const rawX = getLastValue(style.x);
  const rawY = getLastValue(style.y);
  const rawScale = getLastValue(style.scale);

  const translateX = typeof rawX === "number" ? `${rawX}px` : rawX;
  const translateY = typeof rawY === "number" ? `${rawY}px` : rawY;
  const scale =
    typeof rawScale === "number" || typeof rawScale === "string"
      ? rawScale
      : undefined;

  const parts = [
    translateX ? `translateX(${translateX})` : "",
    translateY ? `translateY(${translateY})` : "",
    scale ? `scale(${scale})` : ""
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" ") : undefined;
}

function normalizeStyle(style: MotionStyle | undefined): CSSProperties {
  if (!style) {
    return {};
  }

  const css: CSSProperties = {};
  for (const [key, rawValue] of Object.entries(style)) {
    const value = getLastValue(rawValue);
    if (key === "x" || key === "y" || key === "scale") {
      continue;
    }
    if (key === "width" && typeof value === "number") {
      css.width = `${value}px`;
      continue;
    }
    if (key === "strokeDashoffset") {
      css.strokeDashoffset = value as number;
      continue;
    }
    (css as Record<string, string | number>)[key] = value as string | number;
  }

  const transform = toTransform(style);
  if (transform) {
    css.transform = transform;
  }

  return css;
}

function createMotionComponent(Tag: string) {
  return forwardRef<Element, MotionProps & Record<string, unknown>>(
    function MotionComponent(props: MotionProps & Record<string, unknown>, ref) {
      const {
        initial,
        animate,
        whileHover,
        whileTap,
        whileInView,
        transition,
        viewport,
        style,
        children,
        ...rest
      } = props as MotionProps & Record<string, unknown>;
      const innerRef = useRef<Element | null>(null);
      const [isVisible, setIsVisible] = useState(!whileInView);
      const [isHovered, setIsHovered] = useState(false);
      const [isPressed, setIsPressed] = useState(false);
      const [hasMounted, setHasMounted] = useState(false);

      useLayoutEffect(() => {
        setHasMounted(true);
      }, []);

      useEffect(() => {
        if (!whileInView || !innerRef.current) {
          return;
        }

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (viewport?.once ?? true) {
                observer.disconnect();
              }
            } else if (!(viewport?.once ?? true)) {
              setIsVisible(false);
            }
          },
          {
            threshold: viewport?.amount ?? 0.15
          }
        );

        observer.observe(innerRef.current);
        return () => observer.disconnect();
      }, [viewport?.amount, viewport?.once, whileInView]);

      const mergedStyle = useMemo(() => {
        const active =
          whileInView && hasMounted
            ? isVisible
              ? whileInView
              : initial
            : animate;

        const easing = easeMap[transition?.ease ?? ""] ?? transition?.ease ?? "ease";

        return {
          ...(hasMounted ? normalizeStyle(initial) : normalizeStyle(animate)),
          ...normalizeStyle(active),
          ...(isHovered ? normalizeStyle(whileHover) : {}),
          ...(isPressed ? normalizeStyle(whileTap) : {}),
          ...style,
          transition: `all ${transition?.duration ?? 0.4}s ${
            easing
          } ${transition?.delay ?? 0}s`
        } as CSSProperties;
      }, [
        animate,
        hasMounted,
        animate,
        initial,
        isHovered,
        isPressed,
        isVisible,
        style,
        transition?.delay,
        transition?.duration,
        transition?.ease,
        whileHover,
        whileInView,
        whileTap
      ]);

      return React.createElement(
        Tag,
        {
          ...rest,
          ref: (node: Element | null) => {
            innerRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<Element | null>).current = node;
            }
          },
          style: mergedStyle,
          onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
            setIsHovered(true);
            const handler = (rest as Record<string, unknown>).onMouseEnter;
            if (typeof handler === "function") {
              handler(event);
            }
          },
          onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
            setIsHovered(false);
            setIsPressed(false);
            const handler = (rest as Record<string, unknown>).onMouseLeave;
            if (typeof handler === "function") {
              handler(event);
            }
          },
          onMouseDown: (event: React.MouseEvent<HTMLElement>) => {
            setIsPressed(true);
            const handler = (rest as Record<string, unknown>).onMouseDown;
            if (typeof handler === "function") {
              handler(event);
            }
          },
          onMouseUp: (event: React.MouseEvent<HTMLElement>) => {
            setIsPressed(false);
            const handler = (rest as Record<string, unknown>).onMouseUp;
            if (typeof handler === "function") {
              handler(event);
            }
          }
        },
        children
      );
    }
  );
}

const componentCache = new Map<string, React.ComponentType<Record<string, unknown>>>();

export const AnimatePresence = ({
  children
}: {
  children: ReactNode;
  [key: string]: unknown;
}) => <>{children}</>;

export const motion = new Proxy(
  {},
  {
    get: (_, tag: string) => {
      if (!componentCache.has(tag)) {
        componentCache.set(
          tag,
          createMotionComponent(tag) as React.ComponentType<Record<string, unknown>>
        );
      }

      return componentCache.get(tag);
    }
  }
) as Record<string, React.ComponentType<Record<string, unknown>>>;
