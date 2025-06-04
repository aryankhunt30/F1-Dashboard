declare module 'react-plotly.js' {
  import { Component } from 'react';
  
  interface PlotParams {
    data: Array<{
      type: string;
      x: any[];
      y: any[];
      marker?: {
        color: string;
      };
    }>;
    layout: {
      title?: string;
      xaxis?: {
        title?: string;
        tickangle?: number;
      };
      yaxis?: {
        title?: string;
      };
      margin?: {
        b?: number;
      };
    };
    config?: {
      responsive?: boolean;
    };
    style?: {
      width?: string;
      height?: string;
    };
  }

  class Plot extends Component<PlotParams> {}
  export default Plot;
} 