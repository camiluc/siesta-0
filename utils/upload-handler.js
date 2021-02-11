export default async function uploadPhoto(e, pid) {
  // if (!e.target.files.length) return;
  const file = e.target.files[0];
  const filename = encodeURIComponent(file.name);
  const res = await fetch(`/api/upload-url?file=${filename}&pid=${pid}`);

  const { url, fields } = await res.json();
  const formData = new FormData();

  console.log("fields.key: ", fields.key.split("/").pop());

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const upload = await fetch(url, {
    method: "POST",
    body: formData
  });

  if (upload.ok) {
    console.log("Uploaded successfully!");
    // return true;
    return fields.key;
  } else {
    console.error("Upload failed.");
    return false;
  }
}
