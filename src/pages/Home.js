import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteservice from "../appwrite/config";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (userData) {
      appwriteservice.getPosts().then((posts) => {
        console.log("User data:", userData);
        console.log("Posts fetched:", posts);

        if (posts) {
          setPosts(posts.documents);
        }
      });
    }
  }, [userData]);

  if (!userData) {
    return (
      <div className="w-full py-6 text-center">
        <Container>
          <div>
            <h1 className="text-3xl font-semibold hover:text-gray-600 transition-colors duration-300">
              <Link to="/login" className="text-blue-600 underline">
                Login to read posts
              </Link>
            </h1>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-4">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
