type StringMap = { [key: string]: any };
type Callback = (error: any, t: Function) => void;
type events = "initialized" | "loaded" | "failedLoading" | "missingKey" | 'added' | 'removed' | 'languageChanged' | string;
declare interface XMLHttpRequest {}
declare var window;
declare var Creator;