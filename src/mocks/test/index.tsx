jest.mock("~/components/Modal", () => ({ default: ({children}: {children: React.ReactNode}) => <div id="modal-root">{children}</div>}));
