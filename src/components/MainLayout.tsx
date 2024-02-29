import { NavBar } from "./Navbar";

interface Props {
  children?: React.ReactNode;
}

export default function MainLayout(props: Props) {

  return (
    <div className="h-[100svh] w-full md:w-[1000px] mx-auto">
      <header className="mb-5">
        <NavBar />
      </header>
      <main className="px-4 md:px-0">
        {props.children}
      </main>
    </div>
  );
}
