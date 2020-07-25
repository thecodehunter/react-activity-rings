import * as React from "react";
import { Theme, THEMES } from "./Themes";
import ActivityLegend from "./ActivityRingsLegend";
import Rings from "./Rings";
import PieFactory from "./PieFactory";

export type ActivityRingsData = ActivityRingData[];

export type ActivityRingData = {
  value: number;
  label?: string;
  color?: string;
  backgroundColor?: string;
};

export type ActivityRingsConfig = {
  width: number;
  height: number;
  radius?: number;
  ringSize?: number;
};

type ActivityRingsProps = {
  data: ActivityRingData[];
  config: ActivityRingsConfig;
  legend?: boolean;
  legendTitle?: string;
  theme?: Theme;
};

const defaultCfg: ActivityRingsConfig = {
  width: 150,
  height: 150,
  ringSize: 14,
  radius: 32
};

const ActivityRingsBase = ({
  data,
  config,
  theme,
  legend,
  legendTitle
}: ActivityRingsProps) => {
  const cfg = { ...defaultCfg, ...config };
  const backPie = PieFactory.create(data, cfg.height, cfg.radius, [
    0.999,
    0.001
  ]);
  const frontPie = PieFactory.create(data, cfg.height, cfg.radius);
  const selectedTheme = THEMES[theme || "dark"];

  return (
    <div style={styles.layout}>
      <div
        style={{ ...styles.container, width: cfg.width, height: cfg.height }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={cfg.width}
          height={cfg.height}
        >
          <g transform={`translate(${cfg.width / 2},${cfg.height / 2})`}>
            <Rings
              size={cfg.ringSize}
              pie={backPie}
              data={data}
              theme={selectedTheme}
              opacity={true}
            />
            <Rings
              size={cfg.ringSize}
              pie={frontPie}
              data={data}
              theme={selectedTheme}
              opacity={false}
            />
          </g>
        </svg>
      </div>
      {legend && (
        <ActivityLegend title={legendTitle} data={data} theme={theme} />
      )}
    </div>
  );
};

ActivityRingsBase.defaultProps = {
  data: [],
  theme: "dark",
  legend: false
};

const styles = {
  layout: {
    display: "flex",
    alignItems: "center"
  },
  container: {
    display: "flex"
  }
};

const ActivityRings = React.memo(ActivityRingsBase);
export default ActivityRings;
