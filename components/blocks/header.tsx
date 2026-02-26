export default function Header() {
  return (
    <header className="w-full border-0 border-t-0">
      <div className="flex items-center justify-between max-w-4xl w-full mx-auto pt-5 pb-6 px-8 md:px-8 border border-t-0 border-dashed">
        <img src="/logo.png" alt="navi_logo" width={40} height={40} className="w-8 md:w-10 h-8 md:h-10 bg-white rounded-lg"/>
        <p className="text-3xl md:text-4xl text-foreground/80 font-bold">navi</p>
      </div>
    </header>
  );
}
