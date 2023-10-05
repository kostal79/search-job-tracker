import { ReactNode, Suspense, useState } from "react";
import SearchInput from "../components/SearchInput";
import ButtonAddNote from "../components/ButtonAddNote";
import Table from "../components/Table";
import { Await, defer, useLoaderData, useSearchParams } from "react-router-dom";
import { createNote, getAllNotes } from "../services/notesApi";
import Dialog from "../components/Dialog";
import FormAddNote from "../components/FormAddNote";
import { addNote } from "../redux/slices/noteSlice";
import { activeStatuses, finishedStatuses, pageLimit } from "../constants";
import Pagination from "../components/Pagination";
import TableLoader from "../loaders/TableLoader";
import Filters from "../components/Filters";
import { EditableValuesType, INotes } from "../types/types";
import { useAppDispatch } from "../redux/hooks";

interface ILoaderData {
  notes: Array<INotes> | undefined;
}

interface IDashBordLoader {
  request: Request;
}

export default function Dashboard(): ReactNode {
  const { notes } = useLoaderData() as ILoaderData;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchParams, _] = useSearchParams();
  const status = searchParams.get("status");

  const onClose: () => void = () => setIsOpen(false);
  const onOpen: () => void = () => setIsOpen(true);

  const dispatch = useAppDispatch();

  const initialValues: EditableValuesType = {
    company: "",
    vacancy: "",
    status: "under review",
    contact: "",
    comment: "",
  };

  const onSubmit: (values: EditableValuesType) => Promise<void> = async (
    values
  ) => {
    const newNote = await createNote(values);
    const currentStatus = values.status;
    if (
      !status ||
      (status === "active" && activeStatuses.includes(currentStatus)) ||
      (status === "finished" && finishedStatuses.includes(currentStatus))
    ) {
      if (newNote) dispatch(addNote(newNote));
    }
    alert(`Created new note`);
    onClose();
  };

  return (
    <div className="flex flex-col w-full p-8">
      <header className="flex justify-between border-b border-grey-main pb-7">
        <h1 className="text-grey-dark text-3xl font-bold">Data table</h1>
        <section className="w-[70%] flex gap-8 items-center justify-end">
          <SearchInput />
          <ButtonAddNote onClick={onOpen} />
        </section>
      </header>
      <Filters />
      <Suspense fallback={<p>Table loading...</p>}>
        <Await resolve={notes}>
          <TableLoader>
            <Table />
          </TableLoader>
          <Pagination />
        </Await>
      </Suspense>
      <Dialog isOpen={isOpen} onClose={onClose}>
        <FormAddNote initialValues={initialValues} onSubmit={onSubmit} />
      </Dialog>
    </div>
  );
}

export async function dashboardLoader({ request }: IDashBordLoader) {
  const url: URL = new URL(request.url);
  const searchParams: URLSearchParams = new URLSearchParams(url.search);
  const status: string | null = searchParams.get("status") || null;
  const page: number = Number(searchParams.get("page")) || 1;
  const sort: string = searchParams.get("sort") || "created_at";
  const order_increasing: 1 | -1 =
    (Number(searchParams.get("order")) as 1 | -1) || -1;
  const limit: number = pageLimit;
  const search: string | null = searchParams.get("search") || null;
  const currentMonth: number = new Date().getMonth();
  const currentYear: number = new Date().getFullYear();
  const nextMonth: number = currentMonth + 1 < 12 ? currentMonth + 1 : 0;

  const nextYear: number = nextMonth === 0 ? currentYear + 1 : currentYear;

  const DateFrom: number = new Date(currentYear, currentMonth).valueOf();
  const DateTo: number = new Date(nextYear, nextMonth).valueOf();

  const time_from: number = Number(searchParams.get("time_from")) || DateFrom;
  const time_to: number = Number(searchParams.get("time_to")) || DateTo;

  const notes = getAllNotes({
    status,
    page,
    limit,
    sort,
    order_increasing,
    time_from,
    time_to,
    search,
  });

  return defer({ notes: notes });
}
