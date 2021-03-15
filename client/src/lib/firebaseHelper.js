import firebase, { db } from "../config/firebaseconfig";

export const loginByEmail = async (email, password) => {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const logout = async () => {
  return await firebase.auth().signOut();
};

export const addBlog = (uid, blogData) => {
  blogData.date = firebase.firestore.Timestamp.now();
  return db
    .collection("users")
    .doc(uid)
    .collection("articles")
    .add(blogData);
};
export const updateArticle = (uid, id, article) => {
  article.date = firebase.firestore.Timestamp.now();
  return db
    .collection("users")
    .doc(uid)
    .collection("articles")
    .doc(id)
    .set(article);
};

export const getAllArticles = uid => {
  return db
    .collection("users")
    .doc(uid)
    .collection("articles");
};

export const deleteArticles = (uid, id) => {
  return db
    .collection("users")
    .doc(uid)
    .collection("articles")
    .doc(id)
    .delete();
};
