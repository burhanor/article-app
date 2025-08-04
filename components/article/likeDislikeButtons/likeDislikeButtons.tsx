import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { ArticleInfo } from "@/models/ArticleInfo";

interface LikeDislikeButtonsProps {
  stats: ArticleInfo;
}

export default async function LikeDislikeButtons({
  stats,
}: LikeDislikeButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        type="submit"
        variant={true ? "default" : "outline"}
        size="lg"
        className={`flex items-center gap-2 px-8 py-3 transition-all ${
          true
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "hover:bg-green-50 hover:text-green-700 hover:border-green-300 dark:hover:bg-green-900/20"
        }`}
      >
        <ThumbsUp className={`h-5 w-5 ${true ? "fill-current" : ""}`} />
        Like ({stats.likeCount})
      </Button>

      <Button
        type="submit"
        variant={true ? "destructive" : "outline"}
        size="lg"
        className={`flex items-center gap-2 px-8 py-3 transition-all ${
          !true
            ? "hover:bg-red-50 hover:text-red-700 hover:border-red-300 dark:hover:bg-red-900/20"
            : ""
        }`}
      >
        <ThumbsDown className={`h-5 w-5 ${true ? "fill-current" : ""}`} />
        Dislike ({stats.dislikeCount})
      </Button>
    </div>
  );
}
