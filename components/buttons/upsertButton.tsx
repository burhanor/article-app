import { ActionTypes } from "@/enums/ActionTypes";
import { Button } from "../ui/button";

export function UpsertButton({ actionType }: { actionType: ActionTypes }) {
  const buttonText = actionType == ActionTypes.ADD ? "Ekle" : "Güncelle";

  return <Button>{buttonText}</Button>;
}
