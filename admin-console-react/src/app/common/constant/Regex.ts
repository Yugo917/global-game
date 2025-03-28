export class Regex {
  public static readonly UUID: string = "[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}";

  public static readonly LIST_OF_UUID: string = `^(${Regex.UUID}|;${Regex.UUID})+$`;
}
