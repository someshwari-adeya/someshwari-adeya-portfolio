import { ImageResponse } from "next/og";

import { OG_COPY } from "@/lib/constants";

export const runtime = "edge";

export function GET(): ImageResponse {
  return new ImageResponse(
    (
      <div tw="relative flex h-[630px] w-[1200px] bg-[#131313] text-white p-16">
        <div tw="flex flex-1 flex-col">
          <div tw="text-[48px] font-bold tracking-[0.02em]">
            {OG_COPY.nameUpper}
          </div>
          <div tw="mt-4 text-[24px] text-[#ffb597]">{OG_COPY.role}</div>
          <div tw="mt-2 text-[18px] text-[#a68b80]">{OG_COPY.url}</div>
          <div tw="mt-auto text-[14px] text-[#584239]">{OG_COPY.footer}</div>
        </div>
        <div tw="absolute right-0 top-0 h-full w-2 bg-[#f37335]" />
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
