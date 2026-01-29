const Logo = ({ size = "large" }) => {
  const sizes = {
    small: "w-12 h-12",
    medium: "w-20 h-20",
    large: "w-24 h-24"
  };

  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg`}>
      <div className="text-white font-bold text-center">
        <div className="text-2xl">🏥</div>
        <div className="text-xs -mt-1">MALOdoc</div>
      </div>
    </div>
  );
};

export default Logo;
