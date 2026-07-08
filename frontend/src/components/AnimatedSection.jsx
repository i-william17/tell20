import { useEffect, useRef, useState } from "react";

export default function AnimatedSection({ children, className = "", as: Tag = "section", ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`section-transition ${visible ? "is-visible" : ""} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
