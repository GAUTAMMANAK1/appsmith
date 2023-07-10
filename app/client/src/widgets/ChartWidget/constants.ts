export type ChartType =
  | "LINE_CHART"
  | "BAR_CHART"
  | "PIE_CHART"
  | "COLUMN_CHART"
  | "AREA_CHART"
  | "SCATTER_CHART"
  | "CUSTOM_FUSION_CHART"
  | "CUSTOM_ECHARTS_CHART";

export interface ChartDataPoint {
  x: any;
  y: any;
}

export interface ChartData {
  seriesName?: string;
  data: ChartDataPoint[];
  color?: string;
}

export interface CustomFusionChartConfig {
  type: string;
  dataSource?: any;
}

export interface AllChartData {
  [key: string]: ChartData;
}

export interface ChartSelectedDataPoint {
  x: any;
  y: any;
  seriesTitle: string;
}

export const CUSTOM_CHART_TYPES = [
  "area2d",
  "bar2d",
  "bar3d",
  "boxandwhisker2d",
  "candlestick",
  "chord",
  "dragnode",
  "dragarea",
  "dragcolumn2d",
  "dragline",
  "errorbar2d",
  "errorline",
  "errorscatter",
  "funnel",
  "gantt",
  "heatmap",
  "hbullet",
  "hled",
  "InverseMSArea",
  "InverseMSColumn2D",
  "InverseMSLine",
  "LogMSColumn2D",
  "LogMSLine",
  "MultiAxisLine",
  "multilevelpie",
  "overlappedcolumn2d",
  "overlappedbar2d",
  "pyramid",
  "radar",
  "angulargauge",
  "realtimearea",
  "bulb",
  "realtimecolumn",
  "cylinder",
  "hlineargauge",
  "realtimeline",
  "realtimelinedy",
  "realtimestackedarea",
  "realtimestackedcolumn",
  "thermometer",
  "sankey",
  "selectscatter",
  "sparkcolumn",
  "sparkline",
  "sparkwinloss",
  "msstepline",
  "sunburst",
  "treemap",
  "vbullet",
  "vled",
  "waterfall2d",
  "zoomline",
  "zoomlinedy",
  "zoomscatter",
  "column2d",
  "column3d",
  "line",
  "area",
  "bar2d",
  "bar3d",
  "pie2d",
  "pie3d",
  "doughnut2d",
  "doughnut3d",
  "pareto2d",
  "pareto3d",
  "scrollcombidy2d",
  "scrollcombi2d",
  "scrollstackedcolumn2d",
  "scrollmsstackedcolumn2d",
  "scrollmsstackedcolumn2dlinedy",
  "scrollstackedbar2d",
  "scrollarea2d",
  "scrollline2d",
  "scrollcolumn2d",
  "scrollbar2d",
  "bubble",
  "scatter",
  "msstackedcolumn2d",
  "stackedarea2d",
  "stackedbar3d",
  "stackedbar2d",
  "stackedcolumn3d",
  "stackedcolumn2d",
  "msstackedcolumn2dlinedy",
  "stackedcolumn3dlinedy",
  "mscolumn3dlinedy",
  "mscombidy2d",
  "mscombidy3d",
  "stackedcolumn3dline",
  "stackedcolumn2dline",
  "mscolumnline3d",
  "mscombi3d",
  "mscombi2d",
  "marimekko",
  "MSArea",
  "msbar3d",
  "msbar2d",
  "msline",
  "mscolumn3d",
  "mscolumn2d",
  "spline",
  "splinearea",
  "msspline",
  "mssplinedy",
  "mssplinearea",
  "stackedcolumn2dlinedy",
  "stackedarea2dlinedy",
];

// export const CUSTOM_CHART_DEFAULT_PARSED = {
//   dimensions: ["product", "2015", "2016", "2017"],
//   source: [
//     { product: "Matcha Latte", "2015": 84.3, "2016": 65.8, "2017": 15 },
//     { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
//     { product: "Cheese Cocoa", "2015": 86.4, "2016": 65.2, "2017": 40 },
//     { product: "Walnut Brownie", "2015": 72.4, "2016": 53.9, "2017": 39.1 },
//   ]
// };

// export const CUSTOM_CHART_DEFAULT_PARSED = {
//   dimensions: ["product", "2015", "2016", "2017"],
//   source: [
//     { product: "Matcha Latte", "2015": 84.3, "2016": 65.8, "2017": 15 },
//     { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
//     { product: "Cheese Cocoa", "2015": 86.4, "2016": 65.2, "2017": 40 },
//     { product: "Walnut Brownie", "2015": 72.4, "2016": 53.9, "2017": 39.1 },
//   ],
// };

export enum LabelOrientation {
  AUTO = "auto",
  SLANT = "slant",
  ROTATE = "rotate",
  STAGGER = "stagger",
}

export const LABEL_ORIENTATION_COMPATIBLE_CHARTS = [
  "LINE_CHART",
  "AREA_CHART",
  "COLUMN_CHART",
];

// I HAVE KEPT THIS COMMENTED CODE FOR NOW, INCASE I NEED TO USE IT FOR ANY CHANGES THAT I MAY HAVE TO DO BEFORE MERGING THE CODE. PLEASE IGNORE THIS SECTION

// export const DefaultChartConfigs: Record<ChartType, Record<string, unknown>> = {
//   SCATTER_CHART: {},
//   CUSTOM_FUSION_CHART: {},
//   BAR_CHART: {
//     legend: {},
//     xAxis: { type: "value", name: "", nameLocation: "end" },
//     yAxis: { scale: true, type: "category", name: "", nameLocation: "end" },

//     title: {
//       text: "",
//     },
//     series: [{ type: "bar" }],
//   },
//   LINE_CHART: {
//     legend: {},
//     xAxis: { type: "category" },
//     yAxis: { scale: true },
//     title: {
//       text: "",
//     },
//     series: [{ type: "line" }],
//   },
//   PIE_CHART: {
//     legend: {},
//     xAxis: { type: "category", name: "PIE CHART TITLE" },
//     yAxis: {},
//     title: [
//       {
//         text: "",
//       },
//       {
//         text: "2015",
//         top: "15%",
//         left: "25%",
//         textAlign: "center",
//       },
//       {
//         text: "2016",
//         top: "15%",
//         left: "50%",
//         textAlign: "center",
//       },
//       {
//         text: "2017",
//         top: "15%",
//         left: "75%",
//         textAlign: "center",
//       },
//     ],
//     series: [
//       {
//         type: "pie",
//         radius: "40%",
//         center: ["25%", "50%"],
//         encode: {
//           itemName: "product",
//           value: "2015",
//         },
//       },
//     ],
//   },
//   COLUMN_CHART: {
//     legend: {},
//     xAxis: { type: "category" },
//     yAxis: { scale: true },
//     title: {
//       text: "",
//     },
//     series: [{ type: "bar" }],
//   },
//   AREA_CHART: {
//     legend: {},
//     xAxis: { type: "category" },
//     yAxis: {},
//     title: {
//       text: "",
//     },
//     series: [{ type: "line", areaStyle: {} }],
//   },
//   // SCATTER_CHART: {
//   //   legend: {},
//   //     xAxis: { type: 'category' },
//   //       yAxis: {},
//   //       title: {
//   //         title: "Tea Revenue"
//   //       },
//   //       series: [{type: 'scatter'}, {type: 'scatter'}, {type: 'scatter'}],
//   //   },
//   CUSTOM_ECHARTS_CHART: {
//     tooltip: {
//       trigger: "axis",
//       axisPointer: {
//         type: "shadow",
//       },
//     },
//     legend: {},
//     grid: {
//       left: "3%",
//       right: "4%",
//       bottom: "3%",
//       containLabel: true,
//     },
//     xAxis: [
//       {
//         type: "category",
//         data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//       },
//     ],
//     yAxis: [
//       {
//         type: "value",
//       },
//     ],
//     series: [
//       {
//         name: "Direct",
//         type: "bar",
//         emphasis: {
//           focus: "series",
//         },
//         data: [320, 332, 301, 334, 390, 330, 320],
//       },
//       {
//         name: "Email",
//         type: "bar",
//         stack: "Ad",
//         emphasis: {
//           focus: "series",
//         },
//         data: [120, 132, 101, 134, 90, 230, 210],
//       },
//       {
//         name: "Union Ads",
//         type: "bar",
//         stack: "Ad",
//         emphasis: {
//           focus: "series",
//         },
//         data: [220, 182, 191, 234, 290, 330, 310],
//       },
//       {
//         name: "Video Ads",
//         type: "bar",
//         stack: "Ad",
//         emphasis: {
//           focus: "series",
//         },
//         data: [150, 232, 201, 154, 190, 330, 410],
//       },
//       {
//         name: "Search Engine",
//         type: "bar",
//         data: [862, 1018, 964, 1026, 1679, 1600, 1570],
//         emphasis: {
//           focus: "series",
//         },
//         markLine: {
//           lineStyle: {
//             type: "dashed",
//           },
//           data: [[{ type: "min" }, { type: "max" }]],
//         },
//       },
//       {
//         name: "Baidu",
//         type: "bar",
//         barWidth: 5,
//         stack: "Search Engine",
//         emphasis: {
//           focus: "series",
//         },
//         data: [620, 732, 701, 734, 1090, 1130, 1120],
//       },
//       {
//         name: "Google",
//         type: "bar",
//         stack: "Search Engine",
//         emphasis: {
//           focus: "series",
//         },
//         data: [120, 132, 101, 134, 290, 230, 220],
//       },
//       {
//         name: "Bing",
//         type: "bar",
//         stack: "Search Engine",
//         emphasis: {
//           focus: "series",
//         },
//         data: [60, 72, 71, 74, 190, 130, 110],
//       },
//       {
//         name: "Others",
//         type: "bar",
//         stack: "Search Engine",
//         emphasis: {
//           focus: "series",
//         },
//         data: [62, 82, 91, 84, 109, 110, 120],
//       },
//     ],
//   },
// };
