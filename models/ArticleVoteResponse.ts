import { ArticleVote } from "@/enums/ArticleVote";

export default interface ArticleVoteResponse {
  vote: ArticleVote;
  totalVoteCount: number;
}
