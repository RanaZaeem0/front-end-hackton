import { transformImage } from "../../lib/features.ts";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";

const RenderAttachment =  (file:any,url:string) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;

    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt="Attachement"
          width={"200px"}
          height={"150px"}
          style={{
            objectFit: "contain",
          }}
        />
      );

    case "audio":
      return <audio src={url} preload="none" controls />;

    default:
      return <FileOpenIcon />;
  }
};

export  {RenderAttachment};