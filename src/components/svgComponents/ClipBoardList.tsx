import { View, Text } from "react-native";
import React from "react";
import Svg, { Path } from "react-native-svg";


type svgProps = {
    width?: number
    height?: number
    color?: string
}

const ClipBoardList = (props: svgProps) => {
    const { width, height, color } = props
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 26"
      fill={color}
    
    >
      <Path
        d="M16.6667 3.69841H12.6984C12.6984 1.94741 11.2748 0.523804 9.52381 0.523804C7.77282 0.523804 6.34921 1.94741 6.34921 3.69841H2.38095C1.06647 3.69841 0 4.76487 0 6.07936V23.5397C0 24.8542 1.06647 25.9206 2.38095 25.9206H16.6667C17.9812 25.9206 19.0476 24.8542 19.0476 23.5397V6.07936C19.0476 4.76487 17.9812 3.69841 16.6667 3.69841ZM4.7619 21.5555C4.10218 21.5555 3.57143 21.0248 3.57143 20.3651C3.57143 19.7054 4.10218 19.1746 4.7619 19.1746C5.42163 19.1746 5.95238 19.7054 5.95238 20.3651C5.95238 21.0248 5.42163 21.5555 4.7619 21.5555ZM4.7619 16.7936C4.10218 16.7936 3.57143 16.2629 3.57143 15.6032C3.57143 14.9434 4.10218 14.4127 4.7619 14.4127C5.42163 14.4127 5.95238 14.9434 5.95238 15.6032C5.95238 16.2629 5.42163 16.7936 4.7619 16.7936ZM4.7619 12.0317C4.10218 12.0317 3.57143 11.501 3.57143 10.8413C3.57143 10.1815 4.10218 9.65079 4.7619 9.65079C5.42163 9.65079 5.95238 10.1815 5.95238 10.8413C5.95238 11.501 5.42163 12.0317 4.7619 12.0317ZM9.52381 2.50793C10.1835 2.50793 10.7143 3.03868 10.7143 3.69841C10.7143 4.35813 10.1835 4.88888 9.52381 4.88888C8.86409 4.88888 8.33333 4.35813 8.33333 3.69841C8.33333 3.03868 8.86409 2.50793 9.52381 2.50793ZM15.873 20.7619C15.873 20.9802 15.6944 21.1587 15.4762 21.1587H8.33333C8.11508 21.1587 7.93651 20.9802 7.93651 20.7619V19.9682C7.93651 19.75 8.11508 19.5714 8.33333 19.5714H15.4762C15.6944 19.5714 15.873 19.75 15.873 19.9682V20.7619ZM15.873 16C15.873 16.2182 15.6944 16.3968 15.4762 16.3968H8.33333C8.11508 16.3968 7.93651 16.2182 7.93651 16V15.2063C7.93651 14.9881 8.11508 14.8095 8.33333 14.8095H15.4762C15.6944 14.8095 15.873 14.9881 15.873 15.2063V16ZM15.873 11.2381C15.873 11.4563 15.6944 11.6349 15.4762 11.6349H8.33333C8.11508 11.6349 7.93651 11.4563 7.93651 11.2381V10.4444C7.93651 10.2262 8.11508 10.0476 8.33333 10.0476H15.4762C15.6944 10.0476 15.873 10.2262 15.873 10.4444V11.2381Z"
        fill={color}
      />
    </Svg>
  );
};

export default ClipBoardList;