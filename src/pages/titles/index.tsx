import { useRouter } from "next/router";
import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/solid";
import { FullButton } from "~/components/Button";
import MainLayout from "~/components/MainLayout";
import { type TableColumn, TableLayout } from "~/components/Table";
import { type Title } from "~/server/api/routers/title";

import { api } from "~/utils/api";
import { type SortOrder } from "~/utils/helpers";

const PAGE_SIZE = 5;

const getPageUrl = (page: number, sortBy: keyof Title, sortOrder: SortOrder) => {
  return `/titles?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
}

export default function Titles() {
  const router = useRouter();

  const currentPage = router.query.page ? parseInt(router.query.page as string) : 1;
  const defaultSortBy = "titleNumber";
  const currentSortBy = router.query.sortBy ? router.query.sortBy as "titleNumber" | "tenure" : defaultSortBy;
  const defaultSortOrder = "asc";
  const currentSortOrder = router.query.sortOrder ? router.query.sortOrder as SortOrder : defaultSortOrder;

  const { data, isLoading } = api.title.getAll.useQuery({ page: currentPage, pageSize: PAGE_SIZE, sort: { by: currentSortBy, order: currentSortOrder } });

  const columns: TableColumn<Title>[] = [
    {
      title: "Title Number",
      key: "titleNumber",
      sortable: true,
      width: "55%",
    },
    {
      title: "Class of Title",
      key: "tenure",
      sortable: true,
      width: "45%",
    },
  ];

  const changePage = async (newPage: number) => {
    if (newPage < 1) {
      return;
    }

    await router.push(getPageUrl(newPage, currentSortBy, currentSortOrder));
  }

  const onSort = async (key: keyof Title, sortOrder: SortOrder) => {
    await router.push(getPageUrl(1, key, sortOrder));
  }

  return (
    <MainLayout>
      <TableLayout
        columns={columns}
        rows={data}
        onRowClick={(row) => router.push(`/titles/${row.titleNumber}`)}
        onSort={onSort}
        currentSortBy={currentSortBy}
        currentSortOrder={currentSortOrder}
        defaultSortBy={defaultSortBy}
        defaultSortOrder={defaultSortOrder}
        loading={isLoading}
      />
      <div className="flex justify-between items-center mt-3">
        <FullButton
          variant="primary"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
          className="pl-[4px]"
        ><ChevronLeftIcon className="h-6 w-6 mr-1 fill-white" aria-hidden="true" />Previous page
        </FullButton>
        <span>Page {currentPage}</span>
        <FullButton
          variant="primary"
          onClick={() => changePage(currentPage + 1)}
          className="pr-[4px]"
        >
          Next page
          <ChevronRightIcon className="h-6 w-6 ml-1 fill-white" aria-hidden="true" />
        </FullButton>
      </div>
    </MainLayout>
  );
}
