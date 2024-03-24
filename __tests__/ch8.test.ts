import { BookData, BookCollection } from "../src/ch8";

describe("測試sortByPrice - 以輸入域劃分完全組合覆蓋(ACoC)練習", () => {
  const testBook: Record<number, BookData> = {
    100: { title: "Price 100 book", price: 100, tags: [] },
    200: { title: "Price 200 book", price: 200, tags: [] },
    300: { title: "Price 300 book", price: 300, tags: [] },
  };
  const testData: { inputValue: BookData[]; expectValue: BookData[] }[] = [
    { inputValue: [], expectValue: [] },
    { inputValue: [testBook[100]], expectValue: [testBook[100]] },
    {
      inputValue: [testBook[100], testBook[200]],
      expectValue: [testBook[200], testBook[100]],
    },
    {
      inputValue: [testBook[200], testBook[100]],
      expectValue: [testBook[200], testBook[100]],
    },
    {
      inputValue: [testBook[100], testBook[200], testBook[300]],
      expectValue: [testBook[300], testBook[200], testBook[100]],
    },
    {
      inputValue: [testBook[300], testBook[200], testBook[100]],
      expectValue: [testBook[300], testBook[200], testBook[100]],
    },
    {
      inputValue: [testBook[100], testBook[300], testBook[200]],
      expectValue: [testBook[300], testBook[200], testBook[100]],
    },
  ];
  it.each(testData)(
    "測試sortByPrice可以正確排序為降冪",
    ({ inputValue, expectValue }) => {
      const bCollection = new BookCollection(inputValue);
      const sortedBooks = bCollection.sortByPrice();

      expect(sortedBooks).toEqual(expectValue);
    }
  );
});

describe("測試searchByTag - 以資料流圖主路徑覆蓋(PPC)練習", () => {
  const testData: {
    searchTag: string;
    inputBooks: BookData[];
    expectValue: BookData[];
  }[] = [
    { searchTag: "mytag", inputBooks: [], expectValue: [] },
    {
      searchTag: "mytag",
      inputBooks: [
        { title: "A", price: 100, tags: [] },
        { title: "B", price: 200, tags: [] },
      ],
      expectValue: [],
    },
    {
      searchTag: "mytag",
      inputBooks: [
        { title: "A", price: 100, tags: ["mytag"] },
        { title: "B", price: 200, tags: ["mytag"] },
      ],
      expectValue: [
        { title: "A", price: 100, tags: ["mytag"] },
        { title: "B", price: 200, tags: ["mytag"] },
      ],
    },
  ];
  it.each(testData)(
    "測試searchByTag可以正確尋找具有傳入tag的books",
    ({ searchTag, inputBooks, expectValue }) => {
      const bCollection = new BookCollection(inputBooks);
      const found = bCollection.searchByTag(searchTag);

      expect(found).toEqual(expectValue);
    }
  );
});

describe("測試writeToStorage - 練習測試替身", () => {
  beforeEach(() => {
    const localStorageMock = {
      setItem: jest.fn(),
    };

    //因為Jest測試執行環境為NodeJS，並非瀏覽器，因此global中並無localStorage欄位
    Object.defineProperty(global, "localStorage", { value: localStorageMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("測試能正確寫入localStorage", () => {
    const bookData: BookData[] = [],
      storageKey = "saveKey";

    const bCollection = new BookCollection(bookData);
    bCollection.writeToStorage(storageKey);

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "saveKey",
      JSON.stringify(bookData)
    );
  });
});
