"use client";
import { GenericStatusStatistic } from "@/components/administrator/stats/genericStatusStatistic";
import { TopAuthorStatistic } from "@/components/administrator/stats/topAuthorStatistic";
import TopSlug from "@/components/administrator/stats/topSlugStatistic";
import { UserTypeStatistic } from "@/components/administrator/stats/userTypeStatistic";
import {
  GetArticleStatusCount,
  GetCategoryStatusCount,
  GetTagStatusCount,
  GetTopCategories,
  GetTopTags,
} from "@/services/statisticService";
import React from "react";

const AdministratorDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-3   gap-3">
        <div className="col-span-3 md:col-span-1 ">
          <GenericStatusStatistic
            title="Makale Durum Dağılımı"
            fetchStatusCount={GetArticleStatusCount}
            footerText="Toplam Makale Sayısı"
          />
        </div>
        <div className="col-span-3 md:col-span-1">
          <GenericStatusStatistic
            title="Kategori Durum Dağılımı"
            fetchStatusCount={GetCategoryStatusCount}
            footerText="Toplam Kategori Sayısı"
          />
        </div>
        <div className="col-span-3 md:col-span-1">
          <GenericStatusStatistic
            title="Etiket Durum Dağılımı"
            fetchStatusCount={GetTagStatusCount}
            footerText="Toplam Etiket Sayısı"
          />
        </div>
        <div className="col-span-3 md:col-span-1">
          <UserTypeStatistic />
        </div>

        <div className="col-span-3 md:col-span-1">
          <TopSlug
            title="En Sık Kullanılan Kategoriler"
            fetchFunction={GetTopCategories}
            type="Kategori"
          />
        </div>
        <div className="col-span-3 md:col-span-1">
          <TopSlug
            title="En Sık Kullanılan Etiketler"
            fetchFunction={GetTopTags}
            type="Etiket"
          />
        </div>
        <div className="col-span-3 md:col-span-1">
          <TopAuthorStatistic />
        </div>
      </div>
    </>
  );
};

export default AdministratorDashboard;
