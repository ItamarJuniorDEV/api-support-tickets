import fs from "node:fs";

interface Ticket {
  id: string;
  equipment: string;
  description: string;
  user_name: string;
  status: "open" | "progress" | "closed";
  created_at: Date;
  updated_at: Date;
  solution?: string;
}

interface DatabaseData {
  tickets: Ticket[];
}

const DATABASE_PATH = new URL("./db.json", import.meta.url);

export class Database {
  #database: DatabaseData = { tickets: [] };

  constructor() {
    try {
      const data = fs.readFileSync(DATABASE_PATH, "utf-8");
      this.#database = JSON.parse(data);
    } catch {
      this.#persist();
    }
  }

  #persist() {
    fs.writeFileSync(DATABASE_PATH, JSON.stringify(this.#database, null, 2), "utf-8");
  }

  insert(table: keyof DatabaseData, data: Ticket) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }
    this.#persist();
  }

  select(table: keyof DatabaseData, filters?: Partial<Ticket>) {
    let data = this.#database[table] ?? [];

    if (filters) {
      data = data.filter((row) => {
        return Object.entries(filters).some(([key, value]) => {
          const rowValue = row[key as keyof Ticket];
          if (typeof rowValue === "string" && typeof value === "string") {
            return rowValue.toLowerCase().includes(value.toLowerCase());
          }
          return false;
        });
      });
    }

    return data;
  }

  update(table: keyof DatabaseData, id: string, data: Partial<Ticket>) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        ...data,
      };
      this.#persist();
    }
  }

  delete(table: keyof DatabaseData, id: string) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}