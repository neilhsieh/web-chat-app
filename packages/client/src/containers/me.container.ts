import { createContainer } from "unstated-next";
import { useState } from "react";
import { getMe } from "../config";

interface Me {
  firstName: string;
  id: string;
  lastName: string;
}

export const CurrentUser = createContainer(() => {

  const [me, updateMe] = useState<Me>();

  const settingMe = async () => {
    const me = await getMe();
    const { firstName, id, lastName } = me;

    updateMe({ firstName, id, lastName });
  };

  return {
    me,
    settingMe
  };
});
