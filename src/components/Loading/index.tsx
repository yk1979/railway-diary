import React from "react";
import ReactLoading from "react-loading";

import Color from "../../constants/Color";

type Props = React.ComponentProps<typeof ReactLoading> & {
  className?: string;
};

const LoadingIcon: React.FC<Props> = ({
  type = "cubes",
  color = Color.Button.Primary,
  width,
  height,
  className,
}) => (
  <ReactLoading
    className={className}
    type={type}
    color={color}
    height={height}
    width={width}
  />
);

export default LoadingIcon;
