//pages/index.js

import React, { useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import Navbar from "@/components/Navbar";
import ReadPanel from "@/components/ReadPanel";

const index = () => {
  return (
    <div className=" relative">
      <Navbar />
      <ReadPanel />
    </div>
  );
};

export default index;
