import { roleController } from "@/container/role.container";
import { CreateRoleDto } from "@/dto/request/create-role.dto";
import { UpdateRoleDto } from "@/dto/request/update-role.dto";
import { classValidate } from "@/middleware/class-validate.middleware";
import express from "express";
const roleRouter = express.Router();

roleRouter
  .post(
    "/",
    classValidate(CreateRoleDto),
    roleController.common.create.bind(roleController.common)
  )
  .put(
    "/update/:id",
    classValidate(UpdateRoleDto),
    roleController.common.update.bind(roleController.common)
  )
  .delete(
    "/delete/:id",
    roleController.common.delete.bind(roleController.common)
  )

  .get("/:id", roleController.common.findOne.bind(roleController.common))

  .get("/", roleController.common.findAll.bind(roleController.common));

export default roleRouter;
