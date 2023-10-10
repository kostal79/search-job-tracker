import { ReactNode, useState } from "react";
import SearchInput from "../components/SearchInput";
import ButtonAddNote from "../components/ButtonAddNote";
import { Outlet } from "react-router-dom";
import { createNote } from "../services/notesApi";
import Dialog from "../components/Dialog";
import FormAddNote from "../components/FormAddNote";
import { addNote } from "../redux/slices/noteSlice";
import Filters from "../components/Filters";
import { EditableValuesType } from "../types/types";
import { useAppDispatch } from "../redux/hooks";

export default function DashboardLayout(): ReactNode {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    dispatch(addNote(newNote!));
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
      <Outlet />
      <Dialog isOpen={isOpen} onClose={onClose}>
        <FormAddNote initialValues={initialValues} onSubmit={onSubmit} />
      </Dialog>
    </div>
  );
}
