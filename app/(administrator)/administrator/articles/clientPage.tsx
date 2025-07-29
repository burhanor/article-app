"use client";
import AdminCrudButton from "@/components/adminCrudButton/admin-crud-button";

import { useModal } from "@/hooks/use-modal";
import { GenericDataTable } from "@/components/datatable/generic-datatable";

import { useArticleStore } from "@/stores/articleStore";
import { columns } from "./columns";
import articleService from "@/services/articleService";
import ArticleForm from "./articleForm";
import { useCrudResource } from "@/hooks/useCrudResource";

export default function ClientPage() {
  const modal = useModal();
  const articleStore = useArticleStore();

  const { handleCrud, rowSelection, setRowSelection } = useCrudResource({
    entityName: "Makaleler",
    store: articleStore,
    service: articleService,
    openModal: modal.openModal,
    itemLabelKey: "title",
  });
  if (modal.open) {
    return <ArticleForm modal={modal} />;
  }
  return (
    <>
      <AdminCrudButton handleCrud={handleCrud} />
      <div className=" mx-auto py-10">
        <GenericDataTable
          columns={columns}
          data={articleStore.items}
          setDatas={articleStore.setSelectedItems}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      </div>
    </>
  );
}
