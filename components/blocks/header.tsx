export default function Header() {
  return (
    <header className="flex items-center justify-between max-w-4xl w-full mx-auto pt-6 pb-5 px-8 md:px-8">
      {/* <div className="flex items-center justify-center w-full"> */}
        <p className="text-3xl md:text-4xl font-semibold">navi</p>
        <img src="/logo.png" alt="navi_logo" width={40} height={40} className="w-8 md:w-10 h-8 md:h-10 bg-white rounded-lg"/>
        {/* <p className="text-4xl">apotheosis</p> */}
      {/* </div> */}
    </header>
  );
}