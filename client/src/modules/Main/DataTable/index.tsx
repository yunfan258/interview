"use client";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { classfication } from "@/classfication.ts";
import c from "classnames";
import { data } from "@/data.ts";
import { useEffect } from "react";

function decodeUnicode(unicodeStr: string) {
  const splitStr = unicodeStr.split("\\u");
  if (splitStr.length === 1) {
    return unicodeStr;
  }
  let chineseStr = "";
  for (let i = 0, len = splitStr.length; i < len; i++) {
    if (splitStr[i] === "") continue;
    chineseStr += String.fromCharCode(parseInt(splitStr[i], 16));
  }
  return chineseStr;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<any>[] = [
  {
    id: "status",
    header: () => <span className="ml-0.5 w-2 h-8">状态</span>,
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
  },
  {
    id: "index",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        序号
        <ArrowUpDown className="ml-1 h-8 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-center w-16">{+row.index + 1}</span>
    ),
    enableSorting: true,
  },

  {
    accessorKey: "title",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          题目
          <ArrowUpDown className="ml-1 h-8 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-360 min-h-8 flex items-center">
          {row.getValue("title")}
        </div>
      );
    },
  },
  {
    accessorKey: "level",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        难度
        <ArrowUpDown className="ml-1 h-8 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("level")}</span>
    ),
  },
  {
    id: "tag",
    accessorKey: "tag",
    header: () => <span className="ml-0.5 w-2 h-8">标签</span>,
    cell: ({ row }) => decodeUnicode(row.getValue("tag")),
  },
  {
    id: "actions",
    header: () => <span className="ml-0.5 w-2 h-8">操作</span>,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-4 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              复制题目
            </DropdownMenuItem>
            <DropdownMenuItem>收藏</DropdownMenuItem>
            <DropdownMenuItem>加入错题集</DropdownMenuItem>
            <DropdownMenuItem>已掌握</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTable() {
  const navigate = useNavigate();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const hideColunms = (keys: string[]): { [key: string]: boolean } => {
    return keys.reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {} as { [key: string]: boolean });
  };
  useEffect(() => {
    const hiddenColumns = ["status", "level", "actions", "exerciseKey", "tag"];
    table.setColumnVisibility(hideColunms(hiddenColumns));
  }, [table]);

  function replaceURL(key: string, value: number | string) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if (params.has(key)) {
      params.set(key, String(value));
    } else {
      params.append(key, String(value));
    }
    url.search = params.toString();
    window.history.replaceState({}, "", url.toString());
  }
  function getURLParamsByKey(key: string) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get(key);
  }
  const page = table.getState().pagination.pageIndex;
  const query = table.getColumn("title")?.getFilterValue() || "";
  const tag = table.getColumn("tag")?.getFilterValue() || "";

  useEffect(() => {
    const page = getURLParamsByKey("page") || 0;
    const query = getURLParamsByKey("query") || '';
    const tag = getURLParamsByKey("tag") || '';

    table.setPageIndex(+page);
    table.getColumn("title")?.setFilterValue(query)
    table.getColumn("tag")?.setFilterValue(tag)

    replaceURL("page", page);
    replaceURL("query", query);
    replaceURL("tag", tag);
  }, []);

  const onClick = (index: number) =>{
    navigate(`/answer?index=${index}&page=${page}&query=${query}&tag=${tag}`);
  }

  return (
    <div className="w-full data-table">
      <div className="flex items-center py-4">
        <Input
          placeholder="搜索题目"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          onBlur={(event) => replaceURL("query", event.target.value)}
          className="max-w-sm"
        />
        <Select
          onValueChange={(value) => {
            replaceURL("tag", value);
            table.getColumn("tag")?.setFilterValue(value);
          }}
          value={tag as string}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="标签" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.keys(classfication).map((item: string) => {
                return (
                  <SelectItem value={item} key={item}>
                    {decodeUnicode(item)}
                    <span className="text-xs text-[#ccc]">
                      （{classfication?.[item]?.length}）
                    </span>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              设置 <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    defaultChecked={false}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={c({
                        "text-center w-24": header.id !== "title",
                      })}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer odd:bg-white even:bg-gray-50"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={c({
                        "text-center text-xs text-neutral-600":
                          !cell.id.includes("title"),
                      })}
                      onClick={() => {
                        onClick(row.index);
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getState().pagination.pageIndex} / {table.getPageCount()} 页
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              replaceURL("page", page - 1);
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            上一页
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              replaceURL("page", page + 1);
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            下一页
          </Button>
        </div>
      </div>
    </div>
  );
}
