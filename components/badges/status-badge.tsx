import { Status } from "@/enums/Status";

const statusClasses: Record<Status, string> = {
  [Status.Pending]: "bg-yellow-100 text-yellow-800",
  [Status.Published]: "bg-green-100 text-green-800",
  [Status.Rejected]: "bg-gray-100 text-gray-800",
};

const statusText: Record<Status, string> = {
  [Status.Pending]: "Beklemede",
  [Status.Published]: "Yayınlandı",
  [Status.Rejected]: "Reddedildi",
};

export default function StatusBadge({ status }: { status: Status }) {
  const className = statusClasses[status] ?? "bg-gray-100 text-gray-800";
  const text = statusText[status] ?? "Bilinmiyor";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      {text}
    </span>
  );
}
