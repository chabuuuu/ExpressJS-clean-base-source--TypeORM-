import { inject, injectable } from "inversify";
import { ITYPES } from "@/types/interface.types";
import { IAccountService } from "@/service/interface/i.account.service";
import { Account } from "@/models/account.model";
import { IBaseCrudController } from "@/controller/interfaces/i.base-curd.controller";
import { NextFunction, Request, Response } from "express";
import { CreateAccountDto } from "@/dto/request/create-account.dto";
import { convertToDto } from "@/utils/dto-convert/convert-to-dto.util";
import { CreateAccountResponse } from "@/dto/response/create-account.response";
import BaseError from "@/utils/error/base.error";
import { ErrorCode } from "@/enums/error-code.enums";

@injectable()
export class AccountController {
  public common: IBaseCrudController<Account>;
  private accountService: IAccountService<Account>;
  constructor(
    @inject("AccountService") accountService: IAccountService<Account>,
    @inject(ITYPES.Controller) common: IBaseCrudController<any>
  ) {
    this.accountService = accountService;
    this.common = common;
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log("body", req.body);

      const result = await this.accountService.create({
        data: req.body,
      });
      const dtoConverted = convertToDto(CreateAccountResponse, result);
      res.send_ok("Create new account successful", dtoConverted);
    } catch (error) {
      next(error);
    }
  }

  async findOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.params.id)
        throw new BaseError(ErrorCode.NF_01, "Id is required");
      const id = req.params.id;
      const result = await this.accountService.findOne({
        filter: { id: id },
        relations: ["role"],
      });
      res.send_ok("Found successfully", result);
    } catch (error) {
      next(error);
    }
  }
}
