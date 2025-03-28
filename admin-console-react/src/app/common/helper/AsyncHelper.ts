export class AsyncHelper {
  /**
   * wait
   * @param ms number of milliseconds
   */
  static async wait(ms: number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }
}
