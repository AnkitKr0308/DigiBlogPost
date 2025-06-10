import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount(email, password, name) {
    try {
      const useraccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (useraccount) {
        //call login method
        return await this.login(email, password);
      } else {
        throw new Error("Account creation failed");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw new Error("Login failed: " + error.message);
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error getting current user:", error);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession("current");
      //to delete all sessions, use this.account.deleteSessions();
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }
}

const authservice = new AuthService();

export default authservice;
