import { GetServerSidePropsResult, NextPage } from "next";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import Button, { buttonTheme } from "../../../components/Button";
import DiaryCard from "../../../components/DiaryCard";
import EditButton from "../../../components/EditButton";
import Heading from "../../../components/Heading";
import Layout from "../../../components/Layout";
import UserProfile from "../../../components/UserProfile";
import BreakPoint from "../../../constants/BreakPoint";
import { useAuthUser } from "../../../context/userContext";
import { specterRead } from "../../../lib/client";
import { getUserFromFirestore } from "../../../lib/firestore";
import { getDiaries } from "../../../redux/modules/diaries";
import { initializeStore } from "../../../redux/store";
import {
  IndexDiariesServiceBody,
  IndexDiariesServiceQuery,
} from "../../../server/services/diaries/IndexDiariesService";
import { Diary } from "../../../server/services/diaries/types";
import { User } from "../../../types";
import { MyNextContext } from "../../../types/next";

const StyledLayout = styled(Layout)`
  > div {
    padding-bottom: 88px;
  }
`;

const StyledUserProfile = styled(UserProfile)`
  margin-top: 16px;
`;

const DiaryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 1fr);
  gap: 16px;
  margin-top: 24px;
  @media (min-width: ${BreakPoint.Large}px) {
    grid-template-columns: repeat(auto-fill, 343px);
  }
`;

const NoDiaryText = styled.p`
  margin-top: 32px;
  text-align: center;
`;

const StyledEditButton = styled(EditButton)`
  position: fixed;
  right: 16px;
  bottom: 16px;
`;

const StyledLoginButton = styled(Button)`
  margin-top: 24px;
`;

type UserPageProps = {
  user: User;
  diaries: Diary[];
};

const UserPage: NextPage<UserPageProps> = ({ user, diaries }) => {
  const { authUser } = useAuthUser();
  if (!authUser) {
    return (
      <Layout>
        <Link href="/login">
          <a>ログインしてね</a>
        </Link>
      </Layout>
    );
  }

  return (
    <StyledLayout>
      <>
        <Heading.Text1 text="てつどうの記録" />
        <StyledUserProfile
          user={{
            uid: user.id,
            name: user.name,
          }}
          thumbnail={user.photoUrl}
        />
        {diaries.length > 0 ? (
          <DiaryList>
            {diaries.map((d) => (
              <DiaryCard
                key={d.id}
                diary={d}
                url={`/user/${user.id}/diary/${d.id}`}
              />
            ))}
          </DiaryList>
        ) : (
          <NoDiaryText>まだ日記はありません</NoDiaryText>
        )}
        <StyledEditButton />
      </>
      {user.id === authUser.id && (
        <StyledLoginButton
          text="ログアウトする"
          onClick={() => {
            window.location.href = "/login";
          }}
          theme={buttonTheme.back}
        />
      )}
    </StyledLayout>
  );
};

export const getServerSideProps = async ({
  req,
  query,
}: MyNextContext): Promise<GetServerSidePropsResult<UserPageProps>> => {
  const userId = query.userId as string;

  const firestore = req?.firebaseServer.firestore();

  // TODO: promise.all で取得
  // TODO: エラー処理
  const user = await getUserFromFirestore({ firestore, userId });

  const store = initializeStore();
  const params = {
    firestore,
    userId,
  };
  store.dispatch(getDiaries.started(params));

  const diaries = await specterRead<
    Record<string, unknown>,
    IndexDiariesServiceQuery,
    IndexDiariesServiceBody
  >({
    serviceName: "index_diaries",
    query: params,
  });
  store.dispatch(getDiaries.done({ params, result: diaries.body }));

  return {
    props: {
      user,
      diaries: diaries.body,
    },
  };
};

export default UserPage;
