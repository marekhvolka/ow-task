import Link from "next/link";
import { useRouter } from "next/router";
import MainLayout from "~/components/MainLayout";
import { type TableColumn, TableLayout } from "~/components/Table";
import { type Title } from "~/server/api/routers/title";

import { api } from "~/utils/api";

export default function Titles() {
  const router = useRouter();

  const { data } = api.title.getAll.useQuery();

  const columns: TableColumn<Title>[] = [
    { title: "Title Number", key: "titleNumber" },
    { title: "Class of Title", key: "tenure" },
  ];

  return (
    <MainLayout>
      <main className="">
        <div>
          {data ? (
            <TableLayout
              columns={columns}
              rows={data}
              onRowClick={(row) => router.push(`/titles/${row.titleNumber}`)}
            />
            // <table>
            //   <thead>
            //     <tr>
            //       <th className="text-xl font-bold ">Title number</th>
            //       <th className="text-xl font-bold ">Class of Title</th>
            //     </tr>
            //   </thead>
            //   <tbody>
            //     {titles.data.map((title) => (
            //       <tr key={title.titleNumber} className="mb-4">
            //         <Link href={`/titles/${title.titleNumber}`}>
            //           <td className="text-xl font-bold ">{title.titleNumber}</td>
            //           <td className="">{title.tenure}</td>
            //         </Link>
            //       </tr>
            //     ))}
            //   </tbody>
            // </table>
            ) : (
              <div>
                <h1 className="text-4xl font-bold ">Loading...</h1>
              </div>
          )}
        </div>
      </main>
    </MainLayout>
  );
}
