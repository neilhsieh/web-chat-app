import { createContainer } from "unstated-next";
import { useState, useEffect, useLayoutEffect } from "react";
import { getMe } from "../config";
import { api } from "../lib/API";

interface Me {
  firstName: string;
  id: string;
  lastName: string;
}

export const CurrentUser = createContainer(() => {

  const [me, updateMe] = useState<Me | false>();

  useEffect(() => {
    settingMe();
  }, []);

  const settingMe = async () => {
    // const me = await getMe();
    try {
      const me = await api.me();
      const { firstName, id, lastName } = me;

      updateMe({ firstName, id, lastName });
    } catch (e) {
      updateMe(false);
    }

  };

  return {
    me,
    settingMe,
  };
});
