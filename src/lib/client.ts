import Client, { Request, Response } from "@specter/client";

let client: Client;
export const getClient = (): Client => {
  if (client) return client;
  client = new Client({
    base: "/xhr",
    fetchOption: {},
  });
  return client;
};

type ServiceName = "index_diaries" | "show_diary";

export const specterRead = <H, Q, B>({
  serviceName,
  headers,
  query,
}: {
  serviceName: ServiceName;
  headers?: H;
  query?: Q;
}): Promise<Response<Record<string, unknown>, B>> => {
  return getClient().read(
    new Request(serviceName, {
      headers: headers || {},
      query: query || {},
      body: null,
    })
  );
};
