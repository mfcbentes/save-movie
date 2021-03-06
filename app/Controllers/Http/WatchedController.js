'use strict'

const Movie = use('App/Models/Movie');

class WatchedController {
  /**
 * Show a list of all movies.
 * GET watched
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 * @param {View} ctx.view
 */
  async index({ auth }) {
    const movies = await Movie
      .query()
      .where('user_id', auth.user.id)
      .where('watched_flag', true)
      .with('genre')
      .fetch();

    return movies;
  }

  /**
   * Update movie details.
   * PUT or PATCH watched/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params }) {
    const data = { watched_flag: true }
    const movie = await Movie.findOrFail(params.id);
    movie.merge(data);
    await movie.save();

    return movie;
  }
}

module.exports = WatchedController
