import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FullButton } from "~/components/Button";
import MainLayout from "~/components/MainLayout";
import { type TableColumn, TableLayout } from "~/components/Table";
import { type Title } from "~/server/api/routers/title";

import { api } from "~/utils/api";

const PAGE_SIZE = 5;

export default function Titles() {
  const router = useRouter();

  console.log('router.query.page', router.query.page);

  const currentPage = router.query.page ? parseInt(router.query.page as string) : 1;

  const { data } = api.title.getAll.useQuery({ page: currentPage, pageSize: PAGE_SIZE });

  const columns: TableColumn<Title>[] = [
    { title: "Title Number", key: "titleNumber" },
    { title: "Class of Title", key: "tenure" },
  ];

  const changePage = async (newPage: number) => {
    if (newPage < 1) {
      return;
    }

    await router.push(`/titles?page=${newPage}`);
  }

  return (
    <MainLayout>
      <main className="">
        <div>
          {data ? (
            <div>
              <TableLayout
                columns={columns}
                rows={data}
                onRowClick={(row) => router.push(`/titles/${row.titleNumber}`)}
              />
              <div>
                <FullButton
                  variant="primary"
                  disabled={currentPage === 1}
                  onClick={() => changePage(currentPage - 1)}
                >Previous
                </FullButton>
                <FullButton
                  variant="primary"
                  onClick={() => changePage(currentPage + 1)}
                >
                  Next
                </FullButton>
              </div>
            </div>
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
