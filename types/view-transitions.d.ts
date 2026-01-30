// View Transitions API type declarations
interface Document {
    startViewTransition?: (callback: () => void) => ViewTransition;
}

interface ViewTransition {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
    skipTransition: () => void;
}
