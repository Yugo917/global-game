import { Buffer } from "buffer";

export class EncodingHelper {
  /**
   * Encode string content with utf8 encoding, or latin1 encoding for xml with latin1 encoding
   * @param content
   * @returns utf8 or latin1 BufferEncoding
   */
  public static encode(content: string): Buffer {
    // Encode to bytes
    return Buffer.from(content, "utf8");
  }
}
