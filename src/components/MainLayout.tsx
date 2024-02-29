import { NavBar } from "./Navbar";

interface Props {
  children?: React.ReactNode;
}

export default function MainLayout(props: Props) {

  return (
    <div className="h-[100svh] w-[1000px] mx-auto">
      <header className="mb-5">
        <NavBar />
      </header>
      {props.children}
    </div>
  );
}
