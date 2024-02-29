import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FullButton } from "~/components/Button";
import MainLayout from "~/components/MainLayout";
import { type TableColumn, TableLayout } from "~/components/Table";
import { type Title } from "~/server/api/routers/title";

import { api } from "~/utils/api";
import { SortOrder } from "~/utils/helpers";

const PAGE_SIZE = 5;

const getPageUrl = (page: number, sortBy: keyof Title, sortOrder: SortOrder) => {
  return `/titles?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
}

export default function Titles() {
  const router = useRouter();

  console.log('router.query.page', router.query.page);

  const currentPage = router.query.page ? parseInt(router.query.page as string) : 1;
  const currentSortBy = router.query.sortBy ? router.query.sortBy as "titleNumber" | "tenure" : "titleNumber";
  const currentSortOrder = router.query.sortOrder ? router.query.sortOrder as SortOrder : "asc";

  const { data } = api.title.getAll.useQuery({ page: currentPage, pageSize: PAGE_SIZE, sort: { by: currentSortBy, order: currentSortOrder } });

  const columns: TableColumn<Title>[] = [
    {
      title: "Title Number",
      key: "titleNumber",
      sortable: true,
      sortActive: currentSortBy === "titleNumber",
      sortOrder: currentSortOrder,
      width: "70%",
    },
    {
      title: "Class of Title",
      key: "tenure",
      sortable: true,
      sortActive: currentSortBy === "tenure",
      sortOrder: currentSortOrder,
      width: "30%",
    },
  ];

  const changePage = async (newPage: number) => {
    if (newPage < 1) {
      return;
    }

    await router.push(getPageUrl(newPage, currentSortBy, currentSortOrder));
  }

  const onSort = async (column: TableColumn<Title>) => {
    const newSortOrder = currentSortBy === column.key && currentSortOrder === "asc" ? "desc" : "asc";
    await router.push(getPageUrl(1, column.key, newSortOrder));
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
                onSort={onSort}
              />
              <div className="flex justify-between items-center mt-3">
                <FullButton
                  variant="primary"
                  disabled={currentPage === 1}
                  onClick={() => changePage(currentPage - 1)}
                >Previous page
                </FullButton>
                <span>Page {currentPage}</span>
                <FullButton
                  variant="primary"
                  onClick={() => changePage(currentPage + 1)}
                >
                  Next page
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
