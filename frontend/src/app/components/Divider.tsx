import { FunctionComponent } from "react";

interface DividerProps {
  isBlackDivider?: boolean;
}

const Divider: FunctionComponent<DividerProps> = ({ isBlackDivider }) => {
  return (
    <div
      style={{
        width: isBlackDivider ? "100%" : "90%",
        height: isBlackDivider ? "2px" : "1.1px",
        backgroundColor: isBlackDivider ? "black" : "white",
        margin: "20px auto",
      }}
    ></div>
  );
};

export default Divider;
