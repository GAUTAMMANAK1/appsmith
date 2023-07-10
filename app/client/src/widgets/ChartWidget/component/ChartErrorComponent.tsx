import React from "react";
import styled from "styled-components";
import { Colors } from "constants/Colors";

export const ChartErrorContainer = styled.div`
  height: 100%;
  width: 100%;
  background: ${Colors.WHITE};
  overflow: hidden;
  position: absolute;
  padding: 10px 0 0 0;
  opacity: 90%;
  top: 0px;
  left: 0px;
}`;

/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * THIS IS A WIP. THE UX DESIGN FOR THIS COMPONENT HASN'T COME YET. PLEASE IGNORE THIS COMPONENT FROM REVIEW
 * @param props
 * @returns
 */
export function ChartErrorComponent(props: any) {
  const errorMessage = () => {
    const title = "Error in chart data/configuration";
    let subheading = "Message : ";
    let body = "";

    const chartError = props.chartError;
    const typeoferror = typeof chartError as string;
    if (typeoferror == "error" || typeoferror == "object") {
      subheading += chartError.message;
      body += chartError.stack ?? "";
    } else {
      subheading += chartError;
    }
    return {
      title: title,
      subheading: subheading,
      body: body,
    };
  };

  return (
    <ChartErrorContainer>
      <h1 style={{ height: "20%", fontSize: "xx-large", fontWeight: 800 }}>
        {errorMessage().title}
      </h1>
      <p style={{ height: "20%", fontSize: "x-large", fontWeight: 800 }}>
        {errorMessage().subheading}
      </p>
      <div style={{ height: "60%" }}>
        <p style={{ fontSize: "large", fontWeight: 800 }}>Stack :</p>
        <br />
        <p style={{ overflowY: "scroll", fontSize: "medium", height: "70%" }}>
          {errorMessage().body}
        </p>
      </div>
    </ChartErrorContainer>
  );
}
