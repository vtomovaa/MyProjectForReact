import * as request from '../lib/request';

const baseUrl = 'http://localhost:3030/data/comments';

export const getAll = async (orchidId) => {
    const query = new URLSearchParams({
        where: `orchidId="${orchidId}"`,
        load: `owner=_ownerId:users`,
    });

    const result = await request.get(`${baseUrl}?${query}`);

    return result;
};

export const create = async (orchidId, text) => {
    const newComment = await request.post(baseUrl, {
        orchidId,
        text,
    });

    return newComment;
};