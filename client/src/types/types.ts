export interface IUserAuth {
  isAuthorized: boolean;
  user?: IUser;
}

export interface IUser {
  _id: string;
  first_name: string;
  last_name?: string;
  email: string;
  googleId: string;
  avatar: string;
  notes?: INotes;
  role: string;
}

export interface INotes {
  _id: string;
  company: string;
  vacancy: string;
  status: "refused" | "under review" | "interview" | "offer" | "declined offer";
  contact: string;
  comment?: string;
  created_at?: string;
}

export type EditableValuesType = Omit<INotes, "_id" | "created_at">;

export interface INoteParams {
  status: string | null;
  page: number;
  limit: number;
  sort: string;
  order_increasing: 1 | -1;
  time_from: number;
  time_to: number;
  search: string | null;
}

export type FetchStatusType = "idle" | "loading" | "succeeded" | "failed";

export type SelectedFieldType =
| "created_at"
| "company"
| "vacancy"
| "contact"
| "status"
| "comment";

export type SortOrderType = "asc" | "desc";

export type DateIntervalType = {
  from: number;
  to: number;
};

export type GetAllNotesParamsStatusType = "active" | "finished" | "all";

export interface GetAllNotesParams {
  status : GetAllNotesParamsStatusType;
  selectedField?: SelectedFieldType;
  sortOrder?: SortOrderType;
  dateInterval?: DateIntervalType;
}
