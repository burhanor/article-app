import Swal from "sweetalert2";

export function showWarning(message: string, title?: string): void {
  Swal.fire({
    title: title || "Uyarı",
    text: message,
    icon: "warning",
    confirmButtonText: "Tamam",
  });
}
export function showSuccess(message: string, title?: string): void {
  Swal.fire({
    title: title || "Başarılı",
    text: message,
    icon: "success",
    confirmButtonText: "Tamam",
  });
}

export function showError(message: string, title?: string): void {
  Swal.fire({
    title: title || "Hata",
    text: message,
    icon: "error",
    confirmButtonText: "Tamam",
  });
}

export async function confirmDeleteDialog<T extends { name: string }>(
  items: T[],
  options?: {
    title?: string;
    confirmText?: string;
    cancelText?: string;
    itemLabelKey?: keyof T;
  }
): Promise<boolean> {
  const {
    title = "Onay",
    confirmText = "Evet, sil",
    cancelText = "Hayır, iptal et",
    itemLabelKey = "name",
  } = options || {};

  const htmlText = `
    <div style="max-height: 220px; overflow-y: auto;">
      ${items
        .map(
          (item) =>
            `<div class="font-bold">${
              (item[itemLabelKey] as string) || ""
            }</div>`
        )
        .join("")}
    </div>
  `;

  const result = await Swal.fire({
    title,
    html: `Seçilen öğeleri silmek istediğinize emin misiniz?<br>${htmlText}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });

  return result.isConfirmed;
}
