"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { ArticleInfo } from "@/models/ArticleInfo";
import { ArticleVote } from "@/enums/ArticleVote";
import { voteArticle } from "@/services/articleService";

interface LikeDislikeButtonsProps {
  stats: ArticleInfo;
}

export default function LikeDislikeButtons({ stats }: LikeDislikeButtonsProps) {
  const [likeCount, setLikeCount] = useState(stats.likeCount);
  const [dislikeCount, setDislikeCount] = useState(stats.dislikeCount);
  const [userVote, setUserVote] = useState<ArticleVote | null>(null);

  const handleVote = async (vote: ArticleVote) => {
    const response = await voteArticle(stats.articleId, vote);
    if (!response) return;

    let newLikeCount = 0;
    let newDislikeCount = 0;

    response.forEach((item) => {
      if (item.vote === ArticleVote.Like) {
        newLikeCount = item.totalVoteCount;
      }
      if (item.vote === ArticleVote.Dislike) {
        newDislikeCount = item.totalVoteCount;
      }
    });

    // State'leri güncelle
    setLikeCount(newLikeCount);
    setDislikeCount(newDislikeCount);
    setUserVote(vote);
  };

  const isLiked = userVote === ArticleVote.Like;
  const isDisliked = userVote === ArticleVote.Dislike;

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        type="button"
        variant={isLiked ? "default" : "outline"}
        size="lg"
        onClick={() => handleVote(ArticleVote.Like)}
        className={`flex items-center gap-2 px-8 py-3 transition-all ${
          isLiked
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "hover:bg-green-50 hover:text-green-700 hover:border-green-300 dark:hover:bg-green-900/20 cursor-pointer"
        }`}
      >
        <ThumbsUp className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
        Like ({likeCount})
      </Button>

      <Button
        type="button"
        variant={isDisliked ? "destructive" : "outline"}
        size="lg"
        onClick={() => handleVote(ArticleVote.Dislike)}
        className={`flex items-center gap-2 px-8 py-3 transition-all ${
          isDisliked
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "hover:bg-red-50 hover:text-red-700 hover:border-red-300 dark:hover:bg-red-900/20 cursor-pointer"
        }`}
      >
        <ThumbsDown className={`h-5 w-5 ${isDisliked ? "fill-current" : ""}`} />
        Dislike ({dislikeCount})
      </Button>
    </div>
  );
}
