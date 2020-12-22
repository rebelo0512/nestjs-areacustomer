import { config } from "dotenv";

config();

interface IAbbreviateNamesDTO {
  name: string;
  max_lenght?: number | string;
}

export class AbbreviateNames {
  public async abbreviate({
    name,
    max_lenght = process.env.MAX_LENGHT_NAME,
  }: IAbbreviateNamesDTO): Promise<string> {
    const name_array = name.split(" ");
    const name_abbreviate: string[] = [];
    let nameCustom;

    if (name_array.length <= max_lenght) {
      if (name_array.length === 1)
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      else if (name_array.length > 1) {
        await Promise.all(
          name_array.map(async (n) => {
            nameCustom = n.toLowerCase();
            nameCustom =
              nameCustom.charAt(0).toUpperCase() + n.slice(1).toLowerCase();

            name_abbreviate.push(nameCustom);
          }),
        );

        return name_abbreviate.join(" ");
      }
    } else {
      await Promise.all(
        name_array.map((n) => {
          if (n !== name_array[0] && n !== name_array[name_array.length - 1]) {
            name_abbreviate.push(`${n[0]}.`);
          } else {
            name_abbreviate.push(
              n.charAt(0).toUpperCase() + n.slice(1).toLowerCase(),
            );
          }
        }),
      );

      return name_abbreviate.join(" ");
    }
  }
}
