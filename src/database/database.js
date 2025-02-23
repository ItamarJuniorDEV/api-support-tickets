import fs from "node:fs/promises";

const DATABASE_PATH = new URL("./db.json", import.meta.url);
export class Database {
  #database = {};

  constructor() {
    fs.readFile(DATABASE_PATH, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(
      DATABASE_PATH,
      JSON.stringify(this.#database, null, 2),
      "utf-8"
    ).catch((err) => console.error("Erro ao criar db.json:", err));
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
  }

  select(table, filters) {
    let data = this.#database[table] ?? [];

    if (filters) {
      data = data.filter((row) => {
        return Object.entries(filters).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });

        return row;
      });
    }

    return data;
  }
}
