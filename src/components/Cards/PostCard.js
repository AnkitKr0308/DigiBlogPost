import React, { useState, useEffect } from "react";
import appwriteservice from "../../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredimage }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      if (featuredimage) {
        try {
          const previewUrl = await appwriteservice.previewFile(featuredimage);
          setImageUrl(previewUrl);
          console.log(previewUrl);
        } catch (error) {
          console.error("Error loading image:", error);
        }
      }
    };
    loadImage();
  }, [featuredimage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full justify-center mb-4">
          {imageUrl ? (
            <img
              src={imageUrl.toString()}
              alt={title}
              className="rounded-md w-full"
            />
          ) : null}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
