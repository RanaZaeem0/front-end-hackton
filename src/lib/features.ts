import toast from "react-hot-toast";

const transformImage = (url = "", width = 100) => {
    const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
  
    return newUrl;
  };
const fileFormat = (url = "") => {
    const fileExt = url.split(".").pop();
  
    if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
      return "video";
  
    if (fileExt === "mp3" || fileExt === "wav") return "audio";
    if (
      fileExt === "png" ||
      fileExt === "jpg" ||
      fileExt === "jpeg" ||
      fileExt === "gif"
    )
      return "image";
  
    return "file";
  };
  const getOrSaveFromStorage = ({ key, value, get }:{
    key:string,
    value?:any,
    get?:boolean
  }) => {
    if (get ){
      const item  =  localStorage.getItem(key)
        return item ?  JSON.parse(item) : null;
    }
    else if(value !== undefined) localStorage.setItem(key, JSON.stringify(value));
  };

  
  function handleApiError(errorResponse:any,toastId?:any) {
    if ((errorResponse && errorResponse.error && errorResponse.error.data)) {
      const { message } = errorResponse.error.data;
      if (message) {
        toast.error(message,{id:toastId});
      } else {
        toast.error("An unexpected error occurred.");
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
  }

  export {
   getOrSaveFromStorage,
    fileFormat,
    transformImage,
    handleApiError
  }
