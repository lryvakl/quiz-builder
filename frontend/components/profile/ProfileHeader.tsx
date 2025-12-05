import BackButton from "../buttons/BackButton";

export default function ProfileHeader() {
  return (
    <div className="relative h-48 bg-linear-to-r from-(--color-accent)/20 to-purple-900/20 border-b border-white/5">
      <BackButton></BackButton>
    </div>
  );
}
