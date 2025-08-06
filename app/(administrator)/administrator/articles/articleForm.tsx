"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import { useModal } from "@/hooks/use-modal";
import { useArticleStore } from "@/stores/articleStore";
import { ActionTypes } from "@/enums/ActionTypes";
import { Status } from "@/enums/Status";
import { ArticleDto } from "@/models/Article";
import { useForm } from "react-hook-form";
import { ArticleFormValues, articleSchema } from "@/schemas/articleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/form/formInput/formInput";
import ErrorMessage from "@/components/errorMessage/errorMessage";
import { handleFormSubmit } from "@/lib/formHelper";
import articleService from "@/services/articleService";
import { tinyMCEConfig } from "@/lib/tinyMCEConfig";
import MultiSelectInput, {
  SelectItem,
} from "@/components/form/multiSelectInput/multiSelectInput";
import FormStatusSelect from "@/components/form/formStatusSelect/formStatusSelect";
import tagService from "@/services/tagService";
import categoryService from "@/services/categoryService";
import { defaultArticleDto as defaultItem } from "@/models/defaults/defaultArticle";

export default function ArticleForm({
  modal,
}: {
  modal: ReturnType<typeof useModal>;
}) {
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<SelectItem[]>(
    []
  );
  const [selectedTags, setSelectedTags] = useState<SelectItem[]>([]);

  const [allCategories, setAllCategories] = useState<SelectItem[]>([]);
  const [allTags, setAllTags] = useState<SelectItem[]>([]);

  const [validateTags, setValidateTags] = useState(false);
  const [validateCategories, setValidateCategories] = useState(false);

  useEffect(() => {
    categoryService.fetchAll().then((categories) => {
      setAllCategories(categories.map((cat) => ({ name: cat.name })));
    });
    tagService.fetchAll().then((tags) => {
      setAllTags(tags.map((tag) => ({ name: tag.name })));
    });
  }, []);

  const onSubmit = async (data: ArticleFormValues) => {
    await handleFormSubmit<ArticleDto, ArticleFormValues>({
      data,
      actionType,
      selectedItem,
      addApi: articleService.add,
      updateApi: articleService.update,
      onSuccess: (result) => {
        if (actionType === ActionTypes.ADD) {
          addItem(result);
        } else {
          updateItem(result);
        }
        return;
      },
      form,
      modal,
      messages: {
        add: "Makale başarıyla eklendi.",
        update: "Makale güncellendi.",
        errorAdd: "Makale eklenirken bir hata oluştu.",
        errorUpdate: "Makale güncellenirken bir hata oluştu.",
      },
    });
  };

  const { selectedItems, actionType, addItem, updateItem } = useArticleStore();

  const selectedItem =
    actionType === ActionTypes.UPDATE
      ? selectedItems[0] || defaultItem
      : defaultItem;
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: selectedItem.title || "",
      slug: selectedItem.slug || "",
      status: selectedItem.status || Status.Pending,
      content: selectedItem.content || "",
      categories: selectedItem.categories.map((c) => c.name) || [],
      tags: selectedItem.tags.map((t) => t.name) || [],
      id: selectedItem.id || 0,
    },
  });

  useEffect(() => {
    if (actionType === ActionTypes.UPDATE) {
      setSelectedCategories(
        selectedItem.categories.map((c) => ({ name: c.name }))
      );
      setSelectedTags(selectedItem.tags.map((t) => ({ name: t.name })));
      setContent(selectedItem.content || "");
    }
  }, [selectedItem, actionType]);

  const handleContentChange = (content: string) => {
    setContent(content);
    form.setValue("content", content, {
      shouldValidate: true,
    });
  };

  useEffect(() => {
    if (!validateCategories) {
      return;
    }
    form.setValue(
      "categories",
      selectedCategories.map((c) => c.name),
      {
        shouldValidate: true,
      }
    );
  }, [selectedCategories]);
  useEffect(() => {
    if (!validateTags) {
      return;
    }
    form.setValue(
      "tags",
      selectedTags.map((t) => t.name),
      {
        shouldValidate: true,
      }
    );
  }, [selectedTags]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end">
        <button
          type="button"
          className=" rounded hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => modal.setOpen(false)}
          aria-label="Kapat"
        >
          <X size={28} className=" hover:text-destructive transition-colors" />
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="space-y-2 lg:col-span-2 col-span-1">
              <FormInput
                id="title"
                label="Başlık *"
                error={form.formState.errors.title}
                register={form.register("title")}
              />
            </div>

            <div className="space-y-2 lg:col-span-2 col-span-1">
              <FormInput
                id="slug"
                label="Slug *"
                error={form.formState.errors.slug}
                register={form.register("slug")}
              />
            </div>

            <div className="grid gap-3">
              <FormStatusSelect
                label="Durum"
                name="status"
                status={form.watch("status") as Status}
                setValue={form.setValue}
                trigger={form.trigger}
                error={form.formState.errors.status}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">İçerik *</Label>
            <div className="min-h-[600px]">
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                value={content}
                onEditorChange={(content) => handleContentChange(content)}
                init={tinyMCEConfig}
              />
              <ErrorMessage message={form.formState.errors.content?.message} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <MultiSelectInput
                errorMessage={form.formState.errors.categories?.message}
                title="Kategoriler"
                initData={allCategories}
                selectedItems={selectedCategories}
                setSelectedItems={setSelectedCategories}
                enableValidation={validateCategories}
                setEnableValidation={setValidateCategories}
              />
            </div>

            <div className="space-y-3">
              <MultiSelectInput
                errorMessage={form.formState.errors.tags?.message}
                title="Etiketler"
                initData={allTags}
                selectedItems={selectedTags}
                setSelectedItems={setSelectedTags}
                enableValidation={validateTags}
                setEnableValidation={setValidateTags}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
            <Button type="submit" className="flex-1 sm:flex-none">
              İçeriği Kaydet
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
