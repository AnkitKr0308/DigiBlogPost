import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteservice from "../appwrite/config";
import { Container, PostForm } from "../components";

function EditPost() {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      appwriteservice.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    }
  }, [slug, navigate]);

  return (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
