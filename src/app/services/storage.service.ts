import { Injectable } from "@angular/core";

import { Storage } from "@ionic/storage-angular";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    if (!!this._storage) return;
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    await this.init();
    this._storage?.set(key, value);
  }

  public async get(key: string) {
    await this.init();
    return this._storage?.get(key);
  }

  public async remove(key: string) {
    await this.init();
    this._storage?.remove(key);
  }
}
