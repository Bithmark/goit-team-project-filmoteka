const createYear = function(obj) {
  return obj.release_date ? obj.release_date.slice(0, 4) : "";
}

const createPoster = function(obj) {
  return obj.poster_path
    ? "https://image.tmdb.org/t/p/w500" + obj.poster_path
    : "";
}

const createGenres = function(obj, list) {
    const movieGenreList = obj.genre_ids;
    const movieGenreArray = list.filter(item => movieGenreList.includes(item.id));
    const normalizedGenres = movieGenreArray.map((el) => el.name).join(', ');
    return normalizedGenres;
}

export const createObj = function (data, list) {
  return data.map((obj) => ({
    ...obj,
    release_year: createYear(obj),
    poster: createPoster(obj),
    genres: createGenres(obj, list)
  }));
}