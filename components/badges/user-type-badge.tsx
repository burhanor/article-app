import { UserType } from "@/enums/UserType";

const userTypeClasses: Record<UserType, string> = {
  [UserType.Admin]: "bg-yellow-100 text-yellow-800",
  [UserType.Author]: "bg-green-100 text-green-800",
  [UserType.Editor]: "bg-red-100 text-gray-800",
  [UserType.Guest]: "bg-blue-100 text-gray-800",
  [UserType.Subscriber]: "bg-blue-100 text-gray-800",
};

const userTypeText: Record<UserType, string> = {
  [UserType.Admin]: "Admin",
  [UserType.Author]: "Yazar",
  [UserType.Editor]: "Editör",
  [UserType.Guest]: "Misafir",
  [UserType.Subscriber]: "Abone",
};

export default function UserTypeBadge({ userType }: { userType: UserType }) {
  const style = userTypeClasses[userType] ?? "bg-gray-100 text-gray-800";
  const text = userTypeText[userType] ?? "Bilinmiyor";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style} `}
    >
      {text}
    </span>
  );
}
