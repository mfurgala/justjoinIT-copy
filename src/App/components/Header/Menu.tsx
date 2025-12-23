import type { userInterface } from "@utils/const";
import styles from "./header.module.scss";
import TabMenu from "./Tab/TabMenu";
import TabMenuDraw from "./Tab/TabMenuDraw";

type MenuProps = {
  logout?: () => void;
  user: userInterface;
  direction: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Menu: React.FC<MenuProps> = ({
  logout,
  user,
  direction,
  setOpen,
}) => {
  return (
    <div className={styles[`navigation-${direction}`]}>
      {direction === "column" && setOpen && logout ? (
        <TabMenuDraw setOpen={setOpen} user={user} logout={logout} />
      ) : (
        <TabMenu />
      )}
    </div>
  );
};
