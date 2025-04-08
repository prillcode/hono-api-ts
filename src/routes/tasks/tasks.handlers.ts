import { AppRouteHandler } from "@/lib/types";
import { CreateRoute, GetOneRoute, ListRoute, PatchRoute } from "./tasks.routes";
import db from "@/db";
import { tasks } from "@/db/schema";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "@/lib/constants";
import { eq } from "drizzle-orm";

export const list: AppRouteHandler<ListRoute> = async (c) => {
    const tasks = await db.query.tasks.findMany();
    return c.json(tasks);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
    const task = c.req.valid("json");
    const [newTask] = await db.insert(tasks).values(task).returning();
    return c.json(newTask, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
    const { id } = c.req.valid("param");
    const task = await db.query.tasks.findFirst({
        where(fields, operators) {
            return operators.eq(fields.id, id);
        }
    });
    return c.json(task, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
    const { id } = c.req.valid("param");
    const updates = c.req.valid("json");
  
    if (Object.keys(updates).length === 0) {
      return c.json(
        {
          success: false,
          error: {
            issues: [
              {
                code: ZOD_ERROR_CODES.INVALID_UPDATES,
                path: [],
                message: ZOD_ERROR_MESSAGES.NO_UPDATES,
              },
            ],
            name: "ZodError",
          },
        },
        HttpStatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
  
    const [task] = await db.update(tasks)
      .set(updates)
      .where(eq(tasks.id, id))
      .returning();
  
    if (!task) {
      return c.json(
        {
          message: HttpStatusPhrases.NOT_FOUND,
        },
        HttpStatusCodes.NOT_FOUND,
      );
    }
  
    return c.json(task, HttpStatusCodes.OK);
  };