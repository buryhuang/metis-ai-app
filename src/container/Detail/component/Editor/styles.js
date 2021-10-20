import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: center;
`;

export const Pre = styled.pre`
  text-align: left;
  padding: 0;
  height: 350px;
  overflow: scroll;

  & .token-line {
    line-height: 2em;
    height: 2em;
  }
`;

export const Line = styled.div`
  display: table-row;
`;

export const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  padding-left: 1em;
    background-color: #7094a1;
  color: white;
  user-select: none;
  opacity: 0.5;
`;

export const LineContent = styled.span`
  display: table-cell;
`;
