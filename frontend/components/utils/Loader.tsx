export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-6">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-(--color-accent) blur-2xl opacity-40 animate-pulse" />

        <div className="w-16 h-16 border-4 border-(--color-accent)/30 border-t-(--color-accent) rounded-full animate-spin shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.5)]" />

        <div
          className="absolute w-10 h-10 border-4 border-white/20 border-b-white rounded-full animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "0.6s" }}
        />

        <div className="absolute w-2 h-2 bg-white rounded-full" />
      </div>

      <span className="text-gray-500 text-xs font-bold tracking-[0.3em] uppercase animate-pulse">
        Loading
      </span>
    </div>
  );
}
