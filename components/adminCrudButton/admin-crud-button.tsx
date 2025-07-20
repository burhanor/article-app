import { ActionTypes } from "@/enums/ActionTypes";
import { Pencil, Plus, X } from "lucide-react";

export default function AdminCrudButton({
  handleCrud,
}: {
  handleCrud: (action: ActionTypes) => void;
}) {
  return (
    <div className="flex justify-end space-x-2">
      <button className="btn-add" onClick={() => handleCrud(ActionTypes.ADD)}>
        <Plus />
      </button>
      <button
        className="btn-update"
        onClick={() => handleCrud(ActionTypes.UPDATE)}
      >
        <Pencil />
      </button>
      <button
        className="btn-delete"
        onClick={() => handleCrud(ActionTypes.DELETE)}
      >
        <X />
      </button>
    </div>
  );
}
