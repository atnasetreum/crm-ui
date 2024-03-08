import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const usePagination = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const route = useRouter();

  const handleChangePage = (
    _: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const params = new URLSearchParams(searchParams);

      if (page > 0) params.set("page", `${page + 1}`);
      else params.delete("page");

      if (rowsPerPage !== 5) params.set("limit", `${rowsPerPage}`);
      else params.delete("limit");

      route.replace(`${pathname}?${params.toString()}`);
    }
  }, [isMounted, page, rowsPerPage, searchParams, pathname, route]);

  useEffect(() => {
    if (isMounted) {
      const params = new URLSearchParams(searchParams);

      if (params.has("page")) {
        const pageCurrent = parseInt(params.get("page") ?? "1", 10);
        setPage(pageCurrent - 1);
      }

      if (params.has("limit")) {
        const limitCurrent = parseInt(params.get("limit") ?? "5", 10);
        setRowsPerPage(limitCurrent);
      }
    }
  }, [isMounted, searchParams]);

  return {
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
  };
};
