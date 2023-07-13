import { Colors } from "constants/Colors";
import type { ChartComponentProps } from ".";
import type { ChartData } from "../constants";
import { LabelOrientation } from "../constants";
import EChartsConfiguration from "./EChartsConfigurationBuilder";

describe("EChartsConfigurationBuilder", () => {
  const builder = new EChartsConfiguration();

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

  const chartData = [chartData1, chartData2];

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
  const defaultExpectedConfig = {
    dataZoom: [
      {
        filterMode: "filter",
        start: "20",
        type: "inside",
      },
    ],
    legend: {
      left: "right",
      orient: "vertical",
      textStyle: { fontFamily: "fontfamily" },
      padding: 20,
    },
    grid: { bottom: "100", show: true, left: "100" },
    title: {
      text: defaultProps.chartName,
      left: "center",
      textStyle: {
        fontFamily: "fontfamily",
        fontSize: 24,
        color: Colors.THUNDER,
      },
    },
    xAxis: {
      type: "category",
      axisLabel: {
        rotate: "0",
        fontFamily: "fontfamily",
        color: Colors.DOVE_GRAY2,
      },
      name: "xaxisname",
      nameLocation: "middle",
      nameGap: 40,
      nameTextStyle: {
        fontSize: 14,
        fontFamily: "fontfamily",
        color: Colors.DOVE_GRAY2,
      },
    },
    yAxis: {
      axisLabel: {
        fontFamily: "fontfamily",
        color: Colors.DOVE_GRAY2,
      },
      name: "yaxisname",
      nameLocation: "middle",
      nameGap: 70,
      nameTextStyle: {
        fontSize: 14,
        fontFamily: "fontfamily",
        color: Colors.DOVE_GRAY2,
      },
    },
    series: [
      {
        type: "line",
        itemStyle: { color: "series1color" },
      },
      {
        type: "line",
        itemStyle: { color: "series2color" },
      },
    ],
  };

  it("builds a right chart configuration", () => {
    const output = builder.prepareEChartConfig(defaultProps, chartData);
    expect(output.series).toEqual(defaultExpectedConfig.series);
  });

  describe("allow scroll variations", () => {
    it("data zoom property isn't present if allowScroll is false", () => {
      const props = { ...defaultProps };
      props.allowScroll = false;

      const expectedConfig: any = { ...defaultExpectedConfig };
      expectedConfig.dataZoom = [];

      const output = builder.prepareEChartConfig(props, chartData);

      expect(output).toStrictEqual(expectedConfig);
    });

    it("data zoom property is present if allowScroll is true and chart type isn't PIE_CHART", () => {
      const props = { ...defaultProps };
      props.allowScroll = true;

      const expectedConfig: any = { ...defaultExpectedConfig };

      const output = builder.prepareEChartConfig(props, chartData);
      expect(output.dataZoom).toStrictEqual(expectedConfig.dataZoom);
    });

    it("data zoom property isn't present if chart type is pie chart", () => {
      const props = { ...defaultProps };
      props.chartType = "PIE_CHART";
      props.allowScroll = true;

      const expectedConfig: any = { ...defaultExpectedConfig };
      expectedConfig.dataZoom = [];
      const output = builder.prepareEChartConfig(props, chartData);

      expect(output.dataZoom).toStrictEqual(expectedConfig.dataZoom);
    });
  });

  describe("title configuration variations", () => {
    it("includes default title config for non PIE_CHART chart types", () => {
      const props = { ...defaultProps };
      props.chartType = "BAR_CHART";

      const expectedConfig: any = { ...defaultExpectedConfig };
      expectedConfig.title = {
        text: "chart name",
        left: "center",
        textStyle: {
          fontFamily: "fontfamily",
          fontSize: 24,
          color: Colors.THUNDER,
        },
      };

      const output = builder.prepareEChartConfig(props, chartData);
      expect(output.title).toStrictEqual(expectedConfig.title);
    });

    it("includes layout infomration for pie chart chart type", () => {
      const props = { ...defaultProps };
      props.chartType = "PIE_CHART";

      const expectedConfig: any = { ...defaultExpectedConfig };
      expectedConfig.title = [
        {
          text: "chart name",
          left: "center",
          textStyle: {
            fontFamily: "fontfamily",
            fontSize: 24,
            color: Colors.THUNDER,
          },
        },
        {
          top: "15%",
          left: "33.333333333333336%",
          textAlign: "center",
          text: "series1",
        },
        {
          top: "15%",
          left: "66.66666666666667%",
          textAlign: "center",
          text: "series2",
        },
      ];

      const output = builder.prepareEChartConfig(props, chartData);
      expect(output.title).toStrictEqual(expectedConfig.title);
    });
  });

  describe("x axis configuration variations", () => {
    it("returns appropriate config type for BAR_CHART", () => {
      const props = { ...defaultProps };
      props.chartType = "BAR_CHART";

      const expectedConfig: any = { ...defaultExpectedConfig };
      expectedConfig.xAxis = { ...expectedConfig.xAxis };
      expectedConfig.xAxis.type = "value";

      const output = builder.prepareEChartConfig(props, chartData);
      expect(output.xAxis).toStrictEqual(expectedConfig.xAxis);
    });

    it("should configuration for label orientation SLANT", () => {
      const props = { ...defaultProps };
      props.labelOrientation = LabelOrientation.SLANT;

      const expectedConfig: any = { ...defaultExpectedConfig };
      expectedConfig.xAxis = { ...expectedConfig.xAxis };
      expectedConfig.xAxis.axisLabel = { ...expectedConfig.xAxis.axisLabel };
      expectedConfig.xAxis.axisLabel.rotate = "45"; // slant configuration needs rotate = 45;

      const output = builder.prepareEChartConfig(props, chartData);
      expect(output.xAxis).toStrictEqual(expectedConfig.xAxis);
    });

    it("returns correct configuration for label orientation ROTATE", () => {
      const props = { ...defaultProps };
      props.labelOrientation = LabelOrientation.ROTATE;

      const expectedConfig: any = { ...defaultExpectedConfig };
      expectedConfig.xAxis = { ...expectedConfig.xAxis };
      expectedConfig.xAxis.axisLabel = { ...expectedConfig.xAxis.axisLabel };
      expectedConfig.xAxis.axisLabel.rotate = "90";

      const output = builder.prepareEChartConfig(props, chartData);
      expect(output.xAxis).toStrictEqual(expectedConfig.xAxis);
    });

    it("returns correct configuration for label orientation AUTO", () => {
      const props = { ...defaultProps };
      props.labelOrientation = LabelOrientation.AUTO;

      const expectedConfig: any = { ...defaultExpectedConfig };
      expectedConfig.xAxis = { ...expectedConfig.xAxis };
      expectedConfig.xAxis.axisLabel = { ...expectedConfig.xAxis.axisLabel };
      expectedConfig.xAxis.axisLabel.rotate = "0";

      const output = builder.prepareEChartConfig(props, chartData);
      expect(output.xAxis).toStrictEqual(expectedConfig.xAxis);
    });

    it("returns correct xAxis configuration for PIE_CHART", () => {
      const props = { ...defaultProps };
      props.chartType = "PIE_CHART";

      const expectedConfig: any = JSON.parse(
        JSON.stringify(defaultExpectedConfig),
      );
      expectedConfig.xAxis = {
        type: "category",
        axisLabel: { ...defaultExpectedConfig.xAxis.axisLabel },
      };

      const output = builder.prepareEChartConfig(props, chartData);
      expect(output.xAxis).toStrictEqual(expectedConfig.xAxis);
    });
  });

  describe("y axis configuration variations", () => {
    it("returns appropriate y axis type for BAR_CHART", () => {
      const props = { ...defaultProps };
      props.chartType = "BAR_CHART";

      const expectedConfig: any = JSON.parse(
        JSON.stringify(defaultExpectedConfig),
      );
      expectedConfig.yAxis.type = "category";

      const output = builder.prepareEChartConfig(props, chartData);
      expect(output.yAxis).toStrictEqual(expectedConfig.yAxis);
    });

    it("returns correct y axis config for adaptive y axis option", () => {
      const props = { ...defaultProps };
      props.setAdaptiveYMin = true;

      const expectedConfig: any = JSON.parse(
        JSON.stringify(defaultExpectedConfig),
      );
      expectedConfig.yAxis.min = "dataMin"; // "datamin" means that the y axis is adaptive in echarts

      const output = builder.prepareEChartConfig(props, chartData);
      expect(output).toStrictEqual(expectedConfig);
    });

    it("returns correct y axis configuration for chart type PIE_CHART", () => {
      const props = JSON.parse(JSON.stringify(defaultProps));
      props.chartType = "PIE_CHART";

      const config = {
        axisLabel: defaultExpectedConfig.yAxis.axisLabel,
      };

      const output = builder.prepareEChartConfig(props, chartData);
      expect(output.yAxis).toStrictEqual(config);
    });
  });

  describe("series configuration", () => {
    it("chooses the app primary color for first series if no series color is present", () => {
      const props = defaultProps;
      const modifiedChartData = JSON.parse(JSON.stringify(chartData));
      modifiedChartData[0].color = "";

      const expectedConfig: any = JSON.parse(
        JSON.stringify(defaultExpectedConfig),
      );
      expectedConfig.series[0].itemStyle.color = "primarycolor";

      const output = builder.prepareEChartConfig(props, modifiedChartData);
      expect(output).toStrictEqual(expectedConfig);
    });

    it("doesn't choose the app primary color for second series if its series color isn't present", () => {
      const props = defaultProps;
      const modifiedChartData = JSON.parse(JSON.stringify(chartData));
      modifiedChartData[1].color = "";

      const expectedConfig: any = JSON.parse(
        JSON.stringify(defaultExpectedConfig),
      );
      expectedConfig.series[1].itemStyle.color = "";

      const output = builder.prepareEChartConfig(props, modifiedChartData);
      expect(output).toStrictEqual(expectedConfig);
    });

    it("chooses the appropriate configuration for bar chart", () => {
      const props = { ...defaultProps };
      props.chartType = "BAR_CHART";

      const expectedConfig: any = JSON.parse(
        JSON.stringify(defaultExpectedConfig),
      );
      expectedConfig.series[0].type = "bar";
      expectedConfig.series[1].type = "bar";

      const output = builder.prepareEChartConfig(props, chartData);
      expect(output.series).toStrictEqual(expectedConfig.series);
    });

    it("chooses the appropriate configuration for line chart", () => {
      const props = { ...defaultProps };
      props.chartType = "LINE_CHART";

      const expectedConfig: any = JSON.parse(
        JSON.stringify(defaultExpectedConfig),
      );
      expectedConfig.series[0].type = "line";
      expectedConfig.series[1].type = "line";

      const output = builder.prepareEChartConfig(props, chartData);
      expect(output.series).toStrictEqual(expectedConfig.series);
    });

    it("chooses the appropriate configuration for column chart", () => {
      const props = { ...defaultProps };
      props.chartType = "COLUMN_CHART";

      const expectedConfig: any = JSON.parse(
        JSON.stringify(defaultExpectedConfig),
      );
      expectedConfig.series[0].type = "bar";
      expectedConfig.series[1].type = "bar";

      const output = builder.prepareEChartConfig(props, chartData);
      expect(output.series).toStrictEqual(expectedConfig.series);
    });

    it("chooses the appropriate configuration for area chart", () => {
      const props = { ...defaultProps };
      props.chartType = "AREA_CHART";

      const expectedConfig: any = JSON.parse(
        JSON.stringify(defaultExpectedConfig),
      );
      expectedConfig.series[0].type = "line";
      expectedConfig.series[1].type = "line";
      expectedConfig.series[0].areaStyle = {};
      expectedConfig.series[1].areaStyle = {};

      const output = builder.prepareEChartConfig(props, chartData);
      expect(output.series).toStrictEqual(expectedConfig.series);
    });

    it("chooses the appropriate configuration for pie chart", () => {
      const props = { ...defaultProps };
      props.chartType = "PIE_CHART";

      const expectedConfig: any = JSON.parse(
        JSON.stringify(defaultExpectedConfig),
      );
      expectedConfig.series = [
        {
          type: "pie",
          radius: "40%",
          center: ["50%", "50%"],
          label: { fontFamily: "fontfamily", color: Colors.DOVE_GRAY2 },
        },
      ];

      const output = builder.prepareEChartConfig(props, [chartData1]);
      expect(output.series).toStrictEqual(expectedConfig.series);
    });
  });
});
