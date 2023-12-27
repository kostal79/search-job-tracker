import { INotes } from "@/types/types";
import type * as searchDataTypes from "./searchData";
const { searchData } =
  jest.requireActual<typeof searchDataTypes>("./searchData");

const mockData: INotes = {
  _id: "jkhdalkjh",
  company: "IBM",
  vacancy: "fronend",
  status: "refused",
  contact: "Some Name hr@mail.com",
  comment: undefined,
  created_at: "string",
};
const mockData2: INotes = {
  _id: "kjadladf",
  company: "Google",
  vacancy: "backend",
  status: "refused",
  contact: "hr@gmail.com",
  comment: "better day",
  created_at: "string",
};

describe("searcData function", () => {
  test("query in data", () => {
    expect(
      searchData(mockData2, "better", ["status", "_id", "created_at"])
    ).toBe(true);
  });
  test("query not in data", () => {
    expect(searchData(mockData, "aaaa", ["status", "_id", "created_at"])).toEqual(
      false
    );
  });
  test("query in exeption", () => {
    expect(
      searchData(mockData2, "better", [
        "status",
        "_id",
        "created_at",
        "comment",
      ])
    ).toEqual(false);
  });

  test("Empty search", () => {
    expect(searchData(mockData2, "", ["status", "_id", "created_at"])).toEqual(
      true
    );
  });
  test("Upper letters", () => {
    expect(
      searchData(mockData2, "beTTer", ["status", "_id", "created_at"])
    ).toBe(true);
  });
  test("Comment is underfined", () => {
    expect(
      searchData(mockData, "Some", ["status", "_id", "created_at"])
    ).toBe(true);
  });
});

export {};
