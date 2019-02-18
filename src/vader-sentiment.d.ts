declare module 'vader-sentiment' {

  // export type ValenceDict {
  //
  // }
  //
  interface SentimentIntensityAnalyzer {
    static polarity_scores(text: any): any;
  }

  class SentimentIntensityAnalyzer extends SentimentIntensityAnalyzer {
    static polarity_scores( arg: any ): any {
      throw new Error("Method not implemented.");
    }
  }
}