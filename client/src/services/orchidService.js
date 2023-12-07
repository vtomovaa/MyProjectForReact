import * as request from "../lib/request";

const baseUrl = "http://localhost:3030/data/orchids";

export const getAll = async () => {
  const result = await request.get(baseUrl);

  return result;
};

export const getOne = async (orchidId) => {
  const result = await request.get(`${baseUrl}/${orchidId}`);

  return result;
};

export const create = async (orchidData) => {
  const result = await request.post(baseUrl, orchidData);

  return result;
};

export const edit = async (orchidId, orchidData) => {
  const result = await request.put(`${baseUrl}/${orchidId}`, orchidData);

  return result;
};

export const remove = async (orchidId) =>
  request.remove(`${baseUrl}/${orchidId}`);
