import { Client, Account, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.dimkuh.aora",
  projectId: "6783fc08001781729aa2",
  databaseId: "678407f7002db1104998",
  userCollectionId: "678408f6003caf89b35d",
  videoCollectionId: "678409c9001b9a491091",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);

// Созд пользователя  // в app->(auth)=> sign-up в методе submit добавл createUser
export const createUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    //уник айди   пример почты       пароль       имя
    function (response) {
      // регаем
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
