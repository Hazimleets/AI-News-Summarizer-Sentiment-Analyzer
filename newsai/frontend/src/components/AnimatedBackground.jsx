// frontend/src/components/AnimatedBackground.jsx

export default function AnimatedBackground({ children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark text-textLight">
      {/* animated colorful gradient waves */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[200%] h-[200%] animate-gradient 
          bg-[radial-gradient(circle_at_20%_30%,rgba(255,105,180,0.5),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(30,144,255,0.5),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(0,255,200,0.5),transparent_60%)]" 
        />
      </div>

      {/* page content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

