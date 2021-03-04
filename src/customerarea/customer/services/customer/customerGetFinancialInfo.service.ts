import { Injectable } from "@nestjs/common";

import { IxcRepository } from "@ixc/repositories/ixc.repository";
import { format, parseISO, isBefore } from "date-fns";
import { IIxcFindBilletByContractIdDTO } from "@ixc/dto/IIxcFindBilletByContractIdDTO";
import {
  ICustomerFinancialInfoDTO,
  ICustomerFinancialInfoReturnDTO,
} from "../../dto/ICustomerGetFinancialInfoDTO";

@Injectable()
export class CustomerGetFinancialInfo {
  constructor(private IxcRepository: IxcRepository) {}

  public async exec({
    code,
    contract,
  }: ICustomerFinancialInfoDTO): Promise<ICustomerFinancialInfoReturnDTO> {
    const bol_activies = [];
    const bol_pay = [];
    const bol_late = [];
    const bol_detached = [];
    let bol: IIxcFindBilletByContractIdDTO;

    const boletos = await this.IxcRepository.findBilletByContractId(code);

    await Promise.all(
      boletos.map(async (boleto) => {
        if (
          boleto.id_contrato == contract ||
          (boleto.id_contrato === "0" && boleto.id_contrato_avulso === contract)
        ) {
          bol = {
            id: boleto.id,
            valor: boleto.valor,
            status: boleto.status,
            data_vencimento: format(
              parseISO(boleto.data_vencimento),
              "d/M/yyyy",
            ),
            linha_digitavel: boleto.linha_digitavel,
          };

          if (boleto.status === "R") bol_pay.push(bol);
          else if (
            boleto.id_contrato === "0" &&
            boleto.id_contrato_avulso === contract &&
            boleto.status !== "C"
          )
            bol_detached.push(bol);
          else if (boleto.status === "A") {
            if (isBefore(new Date(), parseISO(boleto.data_vencimento)))
              bol_activies.push(bol);
            else bol_late.push(bol);
          }
        }
      }),
    );

    return { bol_activies, bol_pay, bol_late, bol_detached };
  }
}
