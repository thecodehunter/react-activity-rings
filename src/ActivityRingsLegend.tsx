import * as React from "react";
import { Theme, THEMES } from "./Themes";
import { ActivityRingsData, ActivityRingData } from "./ActivityRings";

interface ActivityLegendsProps {
  data: ActivityRingsData;
  title?: string;
  theme?: Theme;
}

const ActivityLegendBase = ({ data, title, theme }: ActivityLegendsProps) => {
  const selectedTheme = THEMES[theme || "dark"];
  const textStyle = {
    ...styles.text,
    color: selectedTheme.LegendColorPercentage
  };
  const labelStyle = { color: selectedTheme.LegendColor };
  return (
    <div style={styles.container}>
      <h3 style={textStyle}>{title}</h3>
      {data.map((ring: ActivityRingData, idx: number) => {
        const bulletColor = ring.color || selectedTheme.RingColors[idx];
        const bulletStyle = { ...styles.bullets, backgroundColor: bulletColor };
        return (
          <div style={styles.row} key={`l_${idx}`}>
            <div style={bulletStyle}></div>
            {ring.label && (
              <p style={textStyle}>
                {`${Math.round(ring.value * 100)}% `}
                <span style={labelStyle}>{ring.label}</span>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    marginLeft: 10
  },
  row: {
    display: "flex",
    alignItems: "center"
  },
  bullets: {
    width: 16,
    height: 16,
    borderRadius: 8
  },
  text: {
    padding: 7,
    margin: 0
  }
};

const ActivityLegend = React.memo(ActivityLegendBase);
export default ActivityLegend;
