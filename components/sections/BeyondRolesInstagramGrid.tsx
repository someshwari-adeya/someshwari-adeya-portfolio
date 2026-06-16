"use client";

import type * as React from "react";
import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Instagram,
  ExternalLink,
  Check,
  Grid,
  Play,
  Bookmark,
  X,
  Send,
  MessageSquare
} from "lucide-react";
import { BEYOND_ROLES } from "@/lib/constants";

interface Comment {
  username: string;
  text: string;
}

interface Post {
  id: string;
  image: string;
  caption: string;
  likes: number;
  commentsCount: number;
  isVideo: boolean;
  videoUrl?: string;
  comments: Comment[];
  link: string;
}

export function BeyondRolesInstagramGrid(): React.JSX.Element {
  const { instagramFeed } = BEYOND_ROLES;
  const { profile, posts } = instagramFeed;

  const [activeTab, setActiveTab] = useState<"posts" | "reels" | "saved">("posts");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Filter posts based on tab
  const filteredPosts = activeTab === "reels" ? posts.filter((p) => p.isVideo) : posts;

  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/5 md:border-outline-variant/30 bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#101010] p-5 sm:p-6 md:p-8 shadow-2xl flex flex-col justify-between h-full w-full select-none">
      {/* Background radial glow */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full w-full space-y-6">
        {/* Instagram Profile Header */}
        <div className="flex flex-col space-y-5">
          {/* Avatar + Main Details */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Instagram Glowing Colorful Story Ring */}
            <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#f59e0b] via-[#d85318] to-[#ec4899] shadow-lg animate-pulse">
              <div className="w-full h-full rounded-full bg-[#151515] p-0.5 relative">
                <Image
                  src={profile.avatar}
                  alt={profile.fullName}
                  fill
                  sizes="80px"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1.5 -right-1 bg-[#d85318] text-white p-0.5 rounded-full border-2 border-[#151515]">
                <Instagram className="h-3 w-3" />
              </div>
            </div>

            {/* Account Metadata */}
            <div className="flex-grow space-y-2">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="font-hanken text-[16px] sm:text-[18px] font-extrabold text-white tracking-tight leading-none">
                  {profile.username}
                </span>
                
                {profile.verified && (
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#3897f0] text-white" title="Verified Creator">
                    <Check className="h-2.5 w-2.5 stroke-[4]" />
                  </span>
                )}

                <a
                  href={instagramFeed.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1 text-[11px] font-bold rounded bg-gradient-to-r from-[#d85318] to-[#f37335] text-white hover:opacity-90 transition-opacity"
                >
                  Follow
                </a>
              </div>

              {/* Counts Stats Row */}
              <div className="flex items-center gap-4 text-xs font-inter">
                <div>
                  <span className="font-bold text-white">{profile.postsCount}</span>
                  <span className="text-on-surface-variant/80 ml-1">posts</span>
                </div>
                <div>
                  <span className="font-bold text-white">{profile.followersCount}</span>
                  <span className="text-on-surface-variant/80 ml-1">followers</span>
                </div>
                <div>
                  <span className="font-bold text-white">{profile.followingCount}</span>
                  <span className="text-on-surface-variant/80 ml-1">following</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio block */}
          <div className="space-y-1.5 font-inter text-xs border-b border-white/5 pb-4.5">
            <h4 className="font-bold text-white leading-tight">{profile.fullName}</h4>
            <span className="text-[10px] text-on-surface-variant/75 font-medium">{profile.category}</span>
            <p className="text-on-surface-variant/90 leading-relaxed whitespace-pre-line mt-1">
              {profile.bio}
            </p>
            <a
              href={profile.websiteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffb597] hover:underline font-semibold flex items-center gap-1.5 mt-2 w-fit"
            >
              <ExternalLink className="h-3 w-3" />
              <span>{profile.website}</span>
            </a>
          </div>
        </div>

        {/* Custom IG Profile Tab Bar */}
        <div className="flex items-center justify-center gap-10 border-b border-white/5 pb-2 text-[10px] sm:text-[11px] font-mono tracking-wider font-bold uppercase select-none">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex items-center gap-1.5 pb-2 border-t-2 pt-1 transition-all ${
              activeTab === "posts"
                ? "border-white text-white"
                : "border-transparent text-on-surface-variant/60 hover:text-white"
            }`}
          >
            <Grid className="h-3.5 w-3.5" />
            <span>Posts</span>
          </button>
          <button
            onClick={() => setActiveTab("reels")}
            className={`flex items-center gap-1.5 pb-2 border-t-2 pt-1 transition-all ${
              activeTab === "reels"
                ? "border-white text-white"
                : "border-transparent text-on-surface-variant/60 hover:text-white"
            }`}
          >
            <Play className="h-3.5 w-3.5" />
            <span>Reels</span>
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-1.5 pb-2 border-t-2 pt-1 transition-all ${
              activeTab === "saved"
                ? "border-white text-white"
                : "border-transparent text-on-surface-variant/60 hover:text-white"
            }`}
          >
            <Bookmark className="h-3.5 w-3.5" />
            <span>Saved</span>
          </button>
        </div>

        {/* 3-Column Square Instagram Posts Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 flex-grow">
          {filteredPosts.map((post, idx) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative aspect-square w-full overflow-hidden rounded bg-black/40 cursor-pointer border border-white/[0.03] group/post"
            >
              <Image
                src={post.image}
                alt={`Instagram post thumbnail`}
                fill
                sizes="(max-width: 768px) 30vw, 15vw"
                className="object-cover transition-transform duration-700 ease-out group-hover/post:scale-105"
              />

              {/* Video icon indicator on thumbnail if post is video */}
              {post.isVideo && (
                <div className="absolute top-2 right-2 z-20 bg-black/40 backdrop-blur-sm p-1 rounded-full pointer-events-none">
                  <Play className="h-3 w-3 fill-white text-white" />
                </div>
              )}

              {/* Grid Hover Overlay */}
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-[1px] transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 z-10 pointer-events-none text-white font-mono font-bold text-[11px]"
                style={{
                  opacity: hoveredIndex === idx ? 1 : 0
                }}
              >
                <div className="flex items-center gap-1.5">
                  <Heart className="h-4.5 w-4.5 text-[#f37335] fill-[#f37335]" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="h-4.5 w-4.5 text-[#ffb597]" />
                  <span>{post.commentsCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Lightbox Dialog Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in">
          {/* Modal Container */}
          <div className="relative max-w-4xl w-full bg-neutral-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-[650px] animate-scale-up">
            
            {/* Left Column: Media Player (Image or Video) */}
            <div className="w-full md:w-3/5 h-[40%]" style={{ height: "100%", maxHeight: "650px" }}>
              <div className="relative w-full h-full bg-black flex items-center justify-center select-none">
                {selectedPost.isVideo && selectedPost.videoUrl ? (
                  <video
                    src={selectedPost.videoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={selectedPost.image}
                    alt={selectedPost.caption}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-contain"
                  />
                )}
              </div>
            </div>

            {/* Right Column: Instagram Interactive Sidebar */}
            <div className="w-full md:w-2/5 bg-neutral-950 flex flex-col justify-between h-[60%] md:h-full border-t md:border-t-0 md:border-l border-white/5">
              
              {/* Header Box */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-[#f59e0b] via-[#d85318] to-[#ec4899]">
                    <div className="w-full h-full rounded-full bg-[#151515] p-0.5 relative">
                      <Image
                        src={profile.avatar}
                        alt={profile.fullName}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-inter text-xs font-bold text-white hover:underline cursor-pointer">
                      {profile.username}
                    </span>
                    {profile.verified && (
                      <span className="h-3 w-3 rounded-full bg-[#3897f0] flex items-center justify-center text-white">
                        <Check className="h-1.5 w-1.5 stroke-[4]" />
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Comments Box */}
              <div className="flex-grow p-4 overflow-y-auto space-y-4 font-inter text-xs text-white/90">
                {/* Caption / Author Post */}
                <div className="flex gap-3">
                  <div className="w-7 h-7 relative rounded-full flex-shrink-0">
                    <Image
                      src={profile.avatar}
                      alt={profile.fullName}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="leading-relaxed">
                    <span className="font-bold mr-1.5 text-white">{profile.username}</span>
                    {selectedPost.caption}
                  </p>
                </div>

                {/* Divider */}
                <div className="border-b border-white/[0.03] pb-1" />

                {/* Interactive Comments */}
                {selectedPost.comments.map((comment, index) => (
                  <div key={index} className="flex gap-3 animate-slide-up">
                    <div className="w-7 h-7 bg-neutral-800 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-[10px] text-white">
                      {comment.username.slice(0, 2).toUpperCase()}
                    </div>
                    <p className="leading-relaxed">
                      <span className="font-bold mr-1.5 text-white">{comment.username}</span>
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Dynamic Footer Area */}
              <div className="p-4 border-t border-white/5 space-y-3 bg-neutral-900/50">
                {/* Quick actions bar */}
                <div className="flex items-center justify-between text-white/95">
                  <div className="flex items-center gap-4">
                    <Heart className="h-5.5 w-5.5 text-white hover:text-[#f37335] hover:fill-[#f37335] cursor-pointer transition-colors" />
                    <MessageSquare className="h-5.5 w-5.5 text-white hover:text-[#ffb597] cursor-pointer transition-colors" />
                    <Send className="h-5.5 w-5.5 text-white hover:text-[#ffb597] cursor-pointer transition-colors" />
                  </div>
                  <Bookmark className="h-5.5 w-5.5 text-white hover:text-[#ffb597] cursor-pointer transition-colors" />
                </div>

                {/* Likes count */}
                <p className="font-inter text-xs font-extrabold text-white">
                  {selectedPost.likes} likes
                </p>

                {/* Click-through back to actual post */}
                <a
                  href={selectedPost.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-[11px] font-bold text-[#ffb597] hover:text-white transition-colors duration-300 inline-flex items-center gap-1.5"
                >
                  <span>View original on Instagram</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </article>
  );
}
