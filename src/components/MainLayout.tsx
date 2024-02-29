import { NavBar } from "./Navbar";

interface Props {
  children?: React.ReactNode;
}

export default function MainLayout(props: Props) {

  return (
    <div className="h-[100svh]">
      <header className=" mb-5 border-b border-b-textColor  ">
        <div className="px-4 w-full md:w-[1000px] mx-auto">
          <NavBar />
        </div>
      </header>
      <main className="px-4 w-full md:w-[1000px] mx-auto">
        {props.children}
      </main>
    </div>
  );
}
