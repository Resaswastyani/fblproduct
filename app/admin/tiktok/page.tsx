"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Video,
  Plus,
  Search,
  ExternalLink,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const tiktokVideos = [
  {
    id: 1,
    title: "Price Action Setup Yang Profitable",
    url: "https://tiktok.com/@tradevault/video/1",
    thumbnail: "/api/placeholder/200/350",
    views: 125000,
    likes: 8500,
    comments: 432,
    shares: 1234,
    status: "published",
    postedAt: "2024-01-18",
  },
  {
    id: 2,
    title: "Cara Entry Gold Yang Benar",
    url: "https://tiktok.com/@tradevault/video/2",
    thumbnail: "/api/placeholder/200/350",
    views: 89000,
    likes: 6200,
    comments: 289,
    shares: 876,
    status: "published",
    postedAt: "2024-01-15",
  },
  {
    id: 3,
    title: "Risk Management 101",
    url: "https://tiktok.com/@tradevault/video/3",
    thumbnail: "/api/placeholder/200/350",
    views: 156000,
    likes: 12300,
    comments: 567,
    shares: 2345,
    status: "published",
    postedAt: "2024-01-12",
  },
  {
    id: 4,
    title: "Setup Trading Pagi Ini",
    url: "https://tiktok.com/@tradevault/video/4",
    thumbnail: "/api/placeholder/200/350",
    views: 45000,
    likes: 3200,
    comments: 145,
    shares: 432,
    status: "draft",
    postedAt: "2024-01-20",
  },
  {
    id: 5,
    title: "Analisa EURUSD Weekly",
    url: "https://tiktok.com/@tradevault/video/5",
    thumbnail: "/api/placeholder/200/350",
    views: 78000,
    likes: 5400,
    comments: 234,
    shares: 654,
    status: "published",
    postedAt: "2024-01-10",
  },
  {
    id: 6,
    title: "Tips Trading untuk Pemula",
    url: "https://tiktok.com/@tradevault/video/6",
    thumbnail: "/api/placeholder/200/350",
    views: 234000,
    likes: 18700,
    comments: 892,
    shares: 3456,
    status: "published",
    postedAt: "2024-01-08",
  },
];

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

export default function AdminTikTokPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredVideos = tiktokVideos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalViews = tiktokVideos.reduce((acc, v) => acc + v.views, 0);
  const totalLikes = tiktokVideos.reduce((acc, v) => acc + v.likes, 0);
  const totalComments = tiktokVideos.reduce((acc, v) => acc + v.comments, 0);
  const totalShares = tiktokVideos.reduce((acc, v) => acc + v.shares, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">TikTok Traffic</h1>
          <p className="text-muted-foreground">
            Manage your TikTok content and analytics
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#EF4444] hover:bg-[#DC2626] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Video
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0D1117] border-[#2A3142] text-foreground max-w-md">
            <DialogHeader>
              <DialogTitle>Add TikTok Video</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Video Title</Label>
                <Input
                  placeholder="Enter video title"
                  className="bg-[#1E2433] border-[#2A3142]"
                />
              </div>
              <div className="space-y-2">
                <Label>TikTok URL</Label>
                <Input
                  placeholder="https://tiktok.com/@username/video/..."
                  className="bg-[#1E2433] border-[#2A3142]"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Enter video description"
                  className="bg-[#1E2433] border-[#2A3142]"
                  rows={3}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-[#2A3142]"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-[#EF4444] hover:bg-[#DC2626]">
                  Save Video
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-5 h-5 text-[#2962FF]" />
            <span className="text-sm text-muted-foreground">Total Views</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {formatNumber(totalViews)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-5 h-5 text-[#EF4444]" />
            <span className="text-sm text-muted-foreground">Total Likes</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {formatNumber(totalLikes)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="w-5 h-5 text-[#10B981]" />
            <span className="text-sm text-muted-foreground">Comments</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {formatNumber(totalComments)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Share2 className="w-5 h-5 text-[#F7C948]" />
            <span className="text-sm text-muted-foreground">Shares</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {formatNumber(totalShares)}
          </p>
        </motion.div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-[#1E2433] border-[#2A3142]"
        />
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0D1117] border border-[#2A3142] rounded-xl overflow-hidden hover:border-[#3A4152] transition-colors"
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-[9/16] bg-gradient-to-br from-[#1E2433] to-[#0D1117] max-h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-1 rounded-md text-xs ${
                    video.status === "published"
                      ? "bg-[#10B981]/80 text-white"
                      : "bg-[#F7C948]/80 text-black"
                  }`}
                >
                  {video.status}
                </span>
              </div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 rounded px-2 py-1">
                <Eye className="w-3 h-3 text-white" />
                <span className="text-xs text-white">
                  {formatNumber(video.views)}
                </span>
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-medium text-foreground line-clamp-2 text-sm">
                  {video.title}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-[#1E2433] border-[#2A3142]"
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in TikTok
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-[#EF4444]">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {formatNumber(video.likes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {formatNumber(video.comments)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="w-3 h-3" />
                    {formatNumber(video.shares)}
                  </span>
                </div>
                <span>{video.postedAt}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Performing */}
      <div className="bg-[#0D1117] border border-[#2A3142] rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#10B981]" />
          <h3 className="font-semibold text-foreground">
            Top Performing Video
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-32 h-24 bg-gradient-to-br from-[#1E2433] to-[#0D1117] rounded-lg flex items-center justify-center">
            <Play className="w-8 h-8 text-white/50" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-foreground mb-2">
              {tiktokVideos.sort((a, b) => b.views - a.views)[0].title}
            </h4>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>
                {formatNumber(
                  tiktokVideos.sort((a, b) => b.views - a.views)[0].views,
                )}{" "}
                views
              </span>
              <span>
                {formatNumber(
                  tiktokVideos.sort((a, b) => b.views - a.views)[0].likes,
                )}{" "}
                likes
              </span>
              <span>
                {formatNumber(
                  tiktokVideos.sort((a, b) => b.views - a.views)[0].shares,
                )}{" "}
                shares
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
