import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class AppwriteService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, content, slug, featuredimage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),

        { title, content, featuredimage, status, userId, slug }
      );
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredimage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Error getting post:", error);
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "true")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Error getting posts:", error);
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      const fileuploaded = await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      return fileuploaded;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }

  async previewFile(fileId) {
    try {
      return await this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Error previewing file:", error);
      throw error;
    }
  }
}

const appwriteservice = new AppwriteService();

export default appwriteservice;
