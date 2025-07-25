import ErrorMessage from "@/components/errorMessage/errorMessage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface SelectItem {
  name: string;
}
interface MultiSelectInputProps {
  errorMessage?: string;
  title: string;
  initData: SelectItem[];
  selectedItems: SelectItem[];
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectItem[]>>;
  enableValidation: boolean;
  setEnableValidation: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MultiSelectInput({
  errorMessage,
  title,
  initData,
  selectedItems,
  setSelectedItems,
  enableValidation,
  setEnableValidation,
}: MultiSelectInputProps) {
  const [itemDropdownOpen, setItemDropdownOpen] = useState(false);
  const [itemSearch, setItemSearch] = useState("");
  const [allItems, setAllItems] = useState<SelectItem[]>([...initData]);
  useEffect(() => {
    setAllItems([...initData]);
  }, [initData]);
  const itemDropdownRef = useRef<HTMLDivElement>(null);
  const itemInputRef = useRef<HTMLInputElement>(null);

  const addItem = (item: SelectItem) => {
    if (selectedItems.find((t) => t.name === item.name)) {
      return;
    }
    if (!enableValidation) {
      setEnableValidation(true);
    }
    setSelectedItems([...selectedItems, item]);
    setItemSearch("");

    // Dropdown'ı açık tut ve input'a focus ver
    setTimeout(() => {
      if (itemInputRef.current) {
        itemInputRef.current.focus();
      }
    }, 0);
  };

  const addNewItem = () => {
    if (!itemSearch.trim()) return;

    // Aynı isimde etiket var mı kontrol et (case insensitive)
    const existingItem = allItems.find(
      (item) => item.name.toLowerCase() === itemSearch.trim().toLowerCase()
    );

    if (existingItem) {
      // Zaten seçili mi kontrol et
      if (selectedItems.find((t) => t.name === existingItem.name)) {
        setItemSearch("");
        return;
      }
      addItem(existingItem);
      return;
    }

    const newItem: SelectItem = {
      name: itemSearch.trim(),
    };

    // Ana listeye ekle
    const updatedItems = [...allItems, newItem];
    setAllItems(updatedItems);

    addItem(newItem);
  };

  const removeItem = (name: string) => {
    setSelectedItems(selectedItems.filter((t) => t.name !== name));
    if (!enableValidation) {
      setEnableValidation(true);
    }
  };
  const availableItems = allItems.filter(
    (item) =>
      !selectedItems.find((st) => st.name === item.name) &&
      item.name.toLowerCase().includes(itemSearch.toLowerCase())
  );
  console.log("availableItems", availableItems, allItems, initData);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        itemDropdownRef.current &&
        !itemDropdownRef.current.contains(event.target as Node)
      ) {
        setItemDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Label>{title}</Label>
      {/* Selected Items */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <Badge
              key={item.name}
              variant="outline"
              className="flex items-center gap-1 pr-1"
            >
              <span>{item.name}</span>
              <button
                type="button"
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                onClick={() => removeItem(item.name)}
              >
                <X className="h-3 w-3 hover:text-destructive" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      {/* Item Selector */}
      <div className="relative" ref={itemDropdownRef}>
        <Input
          ref={itemInputRef}
          placeholder="Ara..."
          value={itemSearch}
          onChange={(e) => {
            setItemSearch(e.target.value);
            setItemDropdownOpen(true);
          }}
          onFocus={() => setItemDropdownOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addNewItem();
            }
          }}
        />
        <ErrorMessage message={errorMessage} />
        {itemDropdownOpen && (itemSearch || availableItems.length > 0) && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="max-h-48 overflow-y-auto">
              {availableItems.length > 0 ? (
                availableItems.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors"
                    onClick={() => addItem(item)}
                  >
                    {item.name}
                  </button>
                ))
              ) : itemSearch ? (
                <div className="p-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={addNewItem}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {itemSearch} ekle
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
