import ChartComponent from ".";
import type { ChartComponentProps } from ".";
import type { ChartData } from "../constants";
import { LabelOrientation } from "../constants";

import React from "react";

import {render } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

let container: any;
let clickCounter = 0;

describe("Chart Widget", () => {
  const seriesData1: ChartData = {
    seriesName: "series1",
    data: [{ x: "x1", y: 1 }],
    color: "series1color",
  };
  const seriesData2: ChartData = {
    seriesName: "series2",
    data: [{ x: "x1", y: 2 }],
    color: "series2color",
  };
  const defaultProps: ChartComponentProps = {
    allowScroll: true,
    chartData: {
      seriesID1: seriesData1,
      seriesID2: seriesData2,
    },
    chartName: "chart name",
    chartType: "AREA_CHART",
    customFusionChartConfig: { type: "type", dataSource: undefined },
    hasOnDataPointClick: true,
    isVisible: true,
    isLoading: false,
    setAdaptiveYMin: false,
    labelOrientation: LabelOrientation.AUTO,
    onDataPointClick: (point) => {
      clickCounter = 1
      const element = document.documentElement
      console.log("element in on click is ", element)
      // element?.remove()
    },
    widgetId: "widgetID",
    xAxisName: "xaxisname",
    yAxisName: "yaxisname",
    borderRadius: "1",
    boxShadow: "1",
    primaryColor: "primarycolor",
    fontFamily: "fontfamily",
    dimensions: { componentWidth: 11, componentHeight: 11 },
    parentColumnSpace: 1,
    parentRowSpace: 1,
    topRow: 0,
    bottomRow: 0,
    leftColumn: 0,
    rightColumn: 0,
  };

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it("renders the correct library for chart type", async () => {
    const { container, getByText, rerender, debug } = render(<ChartComponent {...defaultProps} />)

    debug()

    const xAxisLabel = getByText("xaxisname")
    expect(xAxisLabel).toBeInTheDocument()

    let echartsContainer = container.querySelector("#widgetIDechart-container")
    expect(echartsContainer).toBeInTheDocument()

    let fusionContainer = container.querySelector("#widgetIDcustom-fusion-chart-container")
    expect(fusionContainer).not.toBeInTheDocument()

    defaultProps.chartType = "CUSTOM_FUSION_CHART"
    
    rerender(<ChartComponent {...defaultProps}></ChartComponent>)

    echartsContainer = container.querySelector("#widgetIDechart-container")
    expect(echartsContainer).not.toBeInTheDocument()

    fusionContainer = container.querySelector("#widgetIDcustom-fusion-chart-container")
    expect(fusionContainer).toBeInTheDocument()
  });

  it("adds a click event when user adds a click callback", async () => {
    const { container, debug, baseElement, getByText, rerender } = render(<ChartComponent {...defaultProps} />)    

    let datapoint = container.querySelector("path[d^='M95 0L95 60Z']")
    expect(clickCounter).toEqual(0)
    
    if (datapoint) {
      console.log("clicking on data point")
      await userEvent.click(datapoint)
    }
    expect(clickCounter).toEqual(1)
  })
});
