import { useShop } from "../context/ShopContext";

export default function Link({ href, children, className = "", onClick, ...props }) {
  const { navigate } = useShop();
  const isLocal = href && href.startsWith("/");

  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || !isLocal || event.metaKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        navigate(href);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
