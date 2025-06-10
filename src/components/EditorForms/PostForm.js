import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import appwriteservice from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BlogEditor from "./BlogEditor";
import { Input, Select, Button } from "../index";

function PostForm({ post }) {
  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);

  // const submit = async (data) => {
  //   if (post) {
  //     const file = data.image[0]
  //       ? await appwriteservice.uploadFile(data.image[0])

  //       : null;

  //     if (file) {
  //       appwriteservice.deleteFile(post.featuredimage);
  //     }
  //     const dbPost = await appwriteservice.updatePost(post.$id, {
  //       ...data,
  //       featuredimage: file ? file.$id : undefined,
  //     });

  //     if (dbPost) {
  //       navigate(`/post/${dbPost.$id}`);
  //     }
  //   } else {
  //     const file = await appwriteservice.uploadFile(data.image[0]);

  //     if (file) {
  //       data.featuredimage = file.$id;
  //       const dbPost = await appwriteservice.createPost({
  //         ...data,
  //         userId: userData?.$id,
  //       });

  //       if (dbPost) {
  //         navigate(`/post/${dbPost.$id}`);
  //       }
  //     }
  //   }
  // };

  const submit = async (data) => {
    if (post) {
      const file = data.image?.[0]
        ? await appwriteservice.uploadFile(data.image[0])
        : null;
      if (file) {
        await appwriteservice.deleteFile(post.featuredimage);
      }

      const updatedPostData = { ...data };
      delete updatedPostData.image;

      if (file) {
        updatedPostData.featuredimage = file.$id;
      } else if (post.featuredimage) {
        updatedPostData.featuredimage = post.featuredimage;
      }

      const dbPost = await appwriteservice.updatePost(
        post.$id,
        updatedPostData
      );
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await appwriteservice.uploadFile(data.image[0]);
      const postData = { ...data };
      delete postData.image;
      postData.featuredimage = file.$id;
      postData.userId = userData?.$id;

      const dbPost = await appwriteservice.createPost(postData);
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-");
    } else {
      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setValue, slugTransform]);

  useEffect(() => {
    if (post?.featuredimage) {
      appwriteservice
        .previewFile(post.featuredimage)
        .then((url) => setImageUrl(url));
    }
  }, [post?.featuredimage]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <BlogEditor
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img src={imageUrl} alt={post.title} className="rounded-lg" />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgcolor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
