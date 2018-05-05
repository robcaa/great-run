/**
 * @class LocalStorageService
 *
 * Handle Local Storage cache
 */
class LocalStorageService {

    /**
     * Set one item from localStorage
     *
     * @param key
     * @param value
     */
    public set(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Get one item from localStorage
     *
     * @param key
     */
    public get(key: string): any {
        let item = JSON.parse(localStorage.getItem(key));

        return item;
    }

    /**
     * Remove one item from localStorage
     *
     * @param key
     */
    public remove(key: string): void {
        localStorage.removeItem(key);
    }
}

/**
 * @class SessionStorageService
 *
 * Handle Session Storage cache
 */
class SessionStorageService {
    /**
     * Get one item from sessionStorage
     *
     * @param key
     */
    public set(key: string, value: any): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    /**
     * Get one item from sessionStorage
     *
     * @param key
     */
    public get(key: string): any {
        return JSON.parse(sessionStorage.getItem(key));
    }

    /**
     * Remove one item from sessionStorage
     *
     * @param key
     */
    public remove(key: string): void {
        sessionStorage.removeItem(key);
    }
}




/**
 * @class StorageService
 *
 * The main storage service
 */
class StorageService {
    public localStorage: LocalStorageService;
    public sessionService: SessionStorageService;

    constructor() {
        this.localStorage = new LocalStorageService();
        this.sessionService = new SessionStorageService();
    }
}


export default(new StorageService);