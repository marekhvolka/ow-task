import Link from "next/link";

type PagePath = {
  label: string;
  href: string;
}

interface Props {
  paths: PagePath[];
}

export const Breadcrumbs: React.FC<Props> = (props) => {
  return (
    <div className="flex items-center space-x-2 text-gray-400 text-sm mb-4">
      {props.paths.map((path, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Link
            href={path.href}
            className="text-textColor"
          >
            {path.label}
          </Link>
          {index !== props.paths.length - 1 && (
            <span>/</span>
          )}
        </div>
      ))}
    </div>
  );
}