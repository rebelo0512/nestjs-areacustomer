import { Injectable } from "@nestjs/common";

@Injectable()
export class TransformDocument {
  public async numberToDocument(document: number | string): Promise<string> {
    if (typeof document === "number") document = document.toString();

    document = document.replace(/[^\d]/g, "");

    return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
}
