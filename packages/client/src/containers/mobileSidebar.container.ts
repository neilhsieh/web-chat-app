import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";

export const MobileSidebar = createContainer(() => {
  const [mobileToggle, setMobileToggle] = useState<boolean>(false);

  // useEffect(() => {
  // });

  const toggleSidebar = () => {
    setMobileToggle(!mobileToggle);
  };

  return {
    mobileToggle,
    toggleSidebar
  };
});
