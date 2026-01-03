import { create } from "zustand";

export enum Severity {
  Success = "success",
  Error = "error",
  Info = "info",
}

interface Notification {
  open: boolean;
  message: string;
  severity: Severity;
  show: (message: string, severity?: Severity) => void;
  hide: () => void;
}

export const useNotificationStore = create<Notification>((set) => ({
  open: false,
  message: "",
  severity: Severity.Success,
  show: (message: string, severity?: Severity) =>
    set(() => ({
      open: true,
      message,
      severity: severity ?? Severity.Success,
    })),
  hide: () =>
    set(() => ({
      open: false,
      message: "",
      severity: Severity.Success,
    })),
}));

export function useShowNotification() {
  return useNotificationStore((state) => state.show);
}
