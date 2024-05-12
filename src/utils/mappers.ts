import { User } from "@/model/User";
import dayjs from "dayjs";

export const userMapper = (client: User) => ({
  ...client,
  formattedCreatedAt: dayjs(client.created_at).format(
    "DD/MM/YYYY [às] HH:mm:ss"
  ),
  formattedUpdatedAt: dayjs(client.updated_at).format(
    "DD/MM/YYYY [às] HH:mm:ss"
  ),
});
