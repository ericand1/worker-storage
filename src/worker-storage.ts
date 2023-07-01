// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/extensions, import/no-unresolved
import workerCode from '!!raw-loader!ts-loader!../uglify-raw!babel-loader!./worker.js';

enum WorkerStorageAction {
  GetItem = 'getItem',
  SetItem = 'setItem',
  Clear = 'clear',
  RemoveItem = 'removeItem',
}

export class WorkerStorage {
  private readonly worker: Worker;

  constructor() {
    if (!window?.Worker) {
      throw new Error('window.Worker is undefined, this library is only available in browser applications, if this is running in a browser app please ensure you are using a supported browser');
    }

    const workerBlob = new Blob([workerCode], { type: 'text/javascript' });
    this.worker = new Worker(window.URL.createObjectURL(workerBlob));
  }

  setItem(key: string, value: any): Promise<void> {
    return this.createEventPromiseWrapper(WorkerStorageAction.SetItem, key, value);
  }

  getItem<T>(key: string): Promise<T> {
    return this.createEventPromiseWrapper<T>(WorkerStorageAction.GetItem, key);
  }

  removeItem(key: string): Promise<void> {
    return this.createEventPromiseWrapper(WorkerStorageAction.RemoveItem, key);
  }

  clear(): Promise<void> {
    return this.createEventPromiseWrapper(WorkerStorageAction.Clear);
  }

  private createEventPromiseWrapper<T>(action: WorkerStorageAction, key?: string, payload?: T): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        clearInterval(interval);
        reject(Error('No response from worker'));
        this.worker.onmessage = null;
        clearInterval(interval);
      }, 500);

      this.worker.onmessage = (e) => {
        if (e.data.action !== action) {
          reject(Error(`Received unexpected action ${e.data.action} in getItem function, have you awaited the calls`));
        } else {
          resolve(action === WorkerStorageAction.GetItem ? e.data.payload : undefined);
        }

        clearInterval(interval);
        this.worker.onmessage = null;
      };

      this.worker.postMessage({ action, key, payload });
    });
  }
}
