import { EncodingHelper } from "./EncodingHelper";

export class ActionHelper {
  /**
   * create a file and download it on the browser
   * @param fileName
   * @param fileContent
   */
  public static DownloadFile(fileName: string, fileContent: string): void {
    const bytes = EncodingHelper.encode(fileContent);
    const file = new Blob([bytes], { type: "application/octet-stream" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  }
}
