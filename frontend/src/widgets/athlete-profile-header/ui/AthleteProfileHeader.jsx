export function StatCard({ value, label }) {
  return (
    <div className="flex-1 px-8 py-3 rounded-xl border border-primary flex flex-col items-center">
      <span className="text-base font-semibold text-primary leading-6">
        {value}
      </span>
      <span className="text-sm text-primary leading-5">{label}</span>
    </div>
  );
}