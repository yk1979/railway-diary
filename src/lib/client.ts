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

export const specterRead = <H, Q, B>({
  serviceName,
  headers,
  query,
}: {
  serviceName: string;
  headers?: H;
  query?: Q;
}): Promise<Response<Record<string, any>, B>> => {
  return getClient().read(
    new Request(serviceName, {
      headers: headers || {},
      query: query || {},
      body: null,
    })
  );
};
// export const client = new Client({
//   base: "/xhr",
//   fetchOption: {},
// });
