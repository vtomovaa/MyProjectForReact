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

export const getLatest = async () => {
  const query = new URLSearchParams({
    // sortBy: `_createdOn desc`,
    offset: 0,
    pageSize: 3,
  });

  const result = await request.get(`${baseUrl}?${query}`);

  return result;
};

export const create = async (gameData) => {
  const result = await request.post(baseUrl, gameData);

  return result;
};

export const edit = async (orchidId, gameData) => {
  console.log(gameData);
  const result = await request.put(`${baseUrl}/${orchidId}`, gameData);

  return result;
};

export const remove = async (orchidId) =>
  request.remove(`${baseUrl}/${orchidId}`);
