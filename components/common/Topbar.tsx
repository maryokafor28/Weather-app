import UnitSettings from "../widgets/UnitSettings";

export default function Topbar() {
  return (
    <header className="w-full py-1 sm:py-2 max-[640px]:-mt-2">
      <div className="max-w-8xl mx-auto px-0 sm:px-4 md:px-6 lg:px-12 xl:px-16">
        <UnitSettings />
      </div>
    </header>
  );
}
