"use client";
import AdminCrudButton from "@/components/adminCrudButton/admin-crud-button";
import { useEffect } from "react";

import { useModal } from "@/hooks/use-modal";
import { GenericDataTable } from "@/components/datatable/generic-datatable";

import { useCrudHandlers } from "@/hooks/useCrudHandlers";
import { useArticleStore } from "@/stores/articleStore";
import { columns } from "./columns";
import { deleteArticles, fetchArticles } from "@/services/articleService";
import ArticleForm from "./articleForm";

export default function ArticlesPage() {
  const modal = useModal();
  const articleStore = useArticleStore();
  useEffect(() => {
    fetchArticles().then(articleStore.setItems);
  }, []);

  const { handleCrud, rowSelection, setRowSelection } = useCrudHandlers({
    entityName: "Makaleler",
    store: articleStore,
    deleteFn: deleteArticles,
    openModal: modal.openModal,
    itemLabelKey: "title",
  });

  return (
    <>
      {modal.open && <ArticleForm modal={modal} />}

      {!modal.open && (
        <>
          {" "}
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
      )}
    </>
  );
}
