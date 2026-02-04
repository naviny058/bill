const DB_NAME = "MyAppDB";
const DB_VERSION = 1;
const STORE_NAME = "users";
const INVOICE_STORE = "invoices";

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      if (!db.objectStoreNames.contains(INVOICE_STORE)) {
        db.createObjectStore(INVOICE_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const addUser = async (user: {
  name: string;
  phoneNum: number;
  shopName: string;
  shopAddress: string
}) => {
  const db = await openDB();

  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    store.add(user);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};
export const getUsers = async (): Promise<
  {
    id: number;
    name: string;
    phoneNum: number;
    shopName: string;
    shopAddress: string
  }[]
> => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const addInvoice = async (invoice: {
  clientName: string;
  phoneNum: number | null;
  workDone: {
    name: string;
    price: number;
    id: number;
  }[];
}) => {
  const db = await openDB();

  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction("invoices", "readwrite");
    const store = tx.objectStore("invoices");

    store.add(invoice);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

