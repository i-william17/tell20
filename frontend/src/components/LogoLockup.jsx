const logoAssets = {
  lightLogo: "/logos/secondary-logo1.png"
};

export default function LogoLockup({ variant = "text", className = "" }) {
  if (variant === "image") {
    return (
      <img
        src={logoAssets.lightLogo}
        alt="Tell20"
        className={`block object-contain ${className}`}
      />
    );
  }

  return (
    <span className={`inline-flex items-baseline font-black tracking-[-0.06em] text-tell ${className}`}>
      tell20<span className="text-tell-deep">.</span>
    </span>
  );
}
