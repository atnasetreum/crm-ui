import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { gql, useLazyQuery } from "@apollo/client";
import { notify } from "@utils";
import { AuthService } from "@services";
import { useCurrentUserStore } from "@store";

const GET_USER = gql`
  query User($userId: Int!) {
    user(id: $userId) {
      id
      name
      email
    }
  }
`;

interface ResponseUser {
  user: User;
}

interface User {
  id: string;
  name: string;
  email: string;
  __typename: string;
}

export const useCurrentUser = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [findUser] = useLazyQuery<ResponseUser>(GET_USER);
  const [user, setUser] = useState<User | null>(null);
  const { setSession, cleanSession } = useCurrentUserStore();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getUser = useCallback(async () => {
    const { data, loading, error } = await findUser({
      variables: { userId: 0 },
    });
    if (!loading) {
      if (error) {
        notify(error?.message);
        setTimeout(() => {
          AuthService.logout().then(() => {
            cleanSession();
            router.push("/");
          });
        }, 3000);
        return;
      }

      if (data) {
        setUser(data.user);
        setSession(data.user.id, data.user.name, data.user.email);
      }
    }
  }, [findUser, router, setSession, cleanSession]);

  useEffect(() => {
    if (isMounted) {
      getUser();
    }
  }, [isMounted, getUser, findUser]);

  return {
    user,
  };
};
