// service から返されるユーザー情報と認証ユーザー情報のどちらにも適用される型なのでここで定義している
export type User = {
  id: string;
  name: string;
  photoUrl: string;
};
