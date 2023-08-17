import { Avatar } from "@mui/material";
import React from "react";
import PostMenu from "./PostMenu";
import ImageStack from "./ImageStack";

export default function Post() {
  return (
    <div className="bg-[#eaf8fa] rounded-xl mt-5 px-4 py-3 border border-[#c1e9f0]">
      {/*  */}
      <div className="flex flex-row items-center">
        <Avatar sx={{ bgcolor: "#299FB5", width: 45, height: 45 }} src="">
          N
        </Avatar>
        <div className="flex flex-col items-start justify-center ml-2">
          <div className="font-bold text-[14px] ">User Name</div>
          <div className="text-[10px] text-[#299FB5] font-semibold">
            1 min ago
          </div>
        </div>
        <div className="flex-1" />
        <div>
          <PostMenu />
        </div>
      </div>
      {/*  */}
      <div className="text-[13px] font-semibold my-2 text-justify">
        Tomorrow will bring something new, so leave today as a memory. I'm
        confused: when people ask me what's up, and I point, they groan. We have
        never been to Asia, nor have we visited Africa. Just go ahead and press
        that button. The father died during childbirth. The ants enjoyed the
        barbecue more than the family. Your girlfriend bought your favorite
        cookie crisp cereal but forgot to get milk. Harrold felt confident that
        nobody would ever suspect his spy pigeon. If you really strain your
        ears, you can just about hear the sound of no one giving a damn. The
        changing of down comforters to cotton bedspreads always meant the
        squirrels had returned. I love eating toasted cheese and tuna
        sandwiches. He knew it was going to be a bad day when he saw mountain
        lions roaming the streets. The old apple revels in its authority. Today
        I dressed my unicorn in preparation for the race. Behind the window was
        a reflection that only instilled fear. She had some amazing news to
        share but nobody to share it with. When he had to picnic on the beach,
        he purposely put sand in other people’s food. Excitement replaced fear
        until the final moment. It isn't difficult to do a handstand if you just
        stand on your hands. For the 216th time, he said he would quit drinking
        soda after this last Coke. The stench from the feedlot permeated the car
        despite having the air conditioning on recycled air. The llama couldn't
        resist trying the lemonade.
      </div>
      <div className="mt-2"/>
      <ImageStack />
    </div>
  );
}
