import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.dimkuh.aora",
  projectId: "6783fc08001781729aa2",
  databaseId: "678407f7002db1104998",
  userCollectionId: "678be5660030e9afcf90",
  videoCollectionId: "678409c9001b9a491091",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);  //созд екземпляр класса в БД

// Созд пользователя  // в app->(auth)=> sign-up в методе submit добавл createUser
export const createUser = async (email, password, username) => {
  try {
    //1 await
    const newAccount = await account.create( // 1 - сначала регаем юзера
      ID.unique(),
      email,
      password,
      username
    )
    if(!newAccount) throw Error; //кидаем ошибку если не получилось

    const avatarUrl = avatars.getInitials(username); //созд аватара

    //2 await
    await signIn(email, password); // 2 - входим в юзера

    //3 await 
    const newUser = await databases.createDocument( //создаём нового зареганого юзера в БД(коллекцию users) 
      config.databaseId,
      config.userCollectionId,
      ID.unique(), 
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    )
    return newUser

  } catch (error) {
    console.log(error);
    throw new Error(error);    
  }   
};

export const signIn = async (email, password) => { // вход в юзера
  try {
    const session = await account.createEmailPasswordSession(email, password); // созд сессию для юзера
    return session;
  } catch (error) {
    throw new Error(error); 
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => { // получить пользователя для записи его в контекст
  try {
    const currentAccount = await getAccount(); //получ текущей учётной записи
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments( //тащим юзера из БД
      config.databaseId, //БД
      config.userCollectionId, //коллекция
      [Query.equal("accountId", currentAccount.$id)] //тащим по айди аккаунта (идентификатор совпадает с айди учётки)
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getAllPosts = async () => { //ипользуем в home.jsx
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    )
    return posts.documents;

  } catch (error) {
    throw new Error(error);
    
  }
}

export const getLatestPosts = async () => { //ипользуем в home.jsx
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))] // выборка по параметру createdAt из video
    )
    return posts.documents;

  } catch (error) {
    throw new Error(error);
  }
}

//поиск к по query
export const searchPosts = async (query) => { //ипользуем в search/[query].jsx
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search('title', query)] // поиск по названию из video
    )
    return posts.documents;

  } catch (error) {
    throw new Error(error);
  }
}
