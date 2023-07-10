import ChartComponent from ".";
import type { ChartComponentProps } from ".";
import type { ChartData } from "../constants";
import { LabelOrientation } from "../constants";

import React from "react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";

// import ReactTestUtils from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event'
// import {render, screen} from '@testing-library/react'
// import "@testing-library/jest-dom";
// import { render } from "@testing-library/react";

let container: any;

describe("my test", () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it("is a first test", () => {
    const chartData1: ChartData = {
      seriesName: "series1",
      data: [{ x: "x1", y: "y1" }],
      color: "series1color",
    };
    const chartData2: ChartData = {
      seriesName: "series2",
      data: [{ x: "x1", y: "y1" }],
      color: "series2color",
    };
    const defaultProps: ChartComponentProps = {
      allowScroll: true,
      chartData: {
        seriesID1: chartData1,
        seriesID2: chartData2,
      },
      chartName: "chart name",
      chartType: "LINE_CHART",
      customFusionChartConfig: { type: "type", dataSource: undefined },
      hasOnDataPointClick: false,
      isVisible: true,
      isLoading: false,
      setAdaptiveYMin: false,
      labelOrientation: LabelOrientation.AUTO,
      onDataPointClick: (point) => {
        point.x;
      },
      widgetId: "widgetID",
      xAxisName: "xaxisname",
      yAxisName: "yaxisname",
      borderRadius: "1",
      boxShadow: "1",
      primaryColor: "primarycolor",
      fontFamily: "fontfamily",
      dimensions: { componentWidth: 1, componentHeight: 1 },
      parentColumnSpace: 1,
      parentRowSpace: 1,
      topRow: 0,
      bottomRow: 0,
      leftColumn: 0,
      rightColumn: 0,
    };
    act(() => {
      ReactDOM.render(<ChartComponent {...defaultProps} />, container);
    });
    expect(document.title).toBe("You clicked 0 times");
    // const output = render();
    // output.asFragment;
    // const svg = output.container.querySelector('div')
  });
});
