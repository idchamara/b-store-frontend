import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

export default function MediaUpload(file) {
  const promise = new Promise((resolve, reject) => {
    if (file == null){
        reject("No file selected")
    }
    const timeStamp = new Date().getTime()
    const newFileName = timeStamp+file.name

    supabase.storage
    .from("images")
    .upload(newFileName, file, {
      cacheControl: "3600",
      upsert: false,
    }).then(
        () => {
            const url = supabase.storage.from("images").getPublicUrl(newFileName);
            resolve(url)  
        }
    ).catch(
        (error) => {
            reject  ("File upload failed")
            console.log(error)
        }
    )

  });
  return promise
}