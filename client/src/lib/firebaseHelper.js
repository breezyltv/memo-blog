import firebase, { db } from "../config/firebaseconfig";

export const loginByEmail = async (email, password) => {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const logout = async () => {
  return await firebase.auth().signOut();
};

export const addBlog = (email, blogData) => {
  blogData.date = firebase.firestore.Timestamp.now();
  return db
    .collection("users")
    .doc(email)
    .collection("blogs")
    .add(blogData);
};
export const updateArticle = (email, id, article) => {
  article.date = firebase.firestore.Timestamp.now();
  return db
    .collection("users")
    .doc(email)
    .collection("blogs")
    .doc(id)
    .set(article);
};

export const getAllArticles = email => {
  return db
    .collection("users")
    .doc(email)
    .collection("blogs");
};

export const getNewestArticles = () => {
  db.collection("articles")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    });
};

export const deleteArticles = (email, id) => {
  return db
    .collection("users")
    .doc(email)
    .collection("blogs")
    .doc(id)
    .delete();
};
