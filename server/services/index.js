const Title = require('../models').Title
const Comment = require('../models').Comment

class IndexService {
    /**
     * @description creates and saves a movie title
     * @param {*} post 
     * @returns {Obj} created title
     */
    createPost(post) {
        return Title.create(post)
    }
    /**
     * @description creates and saves a movie comment
     * @param {*} obj 
     * @returns {obj} created comment
     */
    saveComment(obj) {
        return Comment.create(obj)
    }

    /**
     * @description gets comment count per movie title
     * @param {*} title 
     * @returns {int} comment count
     */
    async getCommentCount(title) {
        let val = await Title.findOne({
            where: {
                title
            },
            attributes: ['id']
        })
        return Comment.count({
            where: {
                titleId: val.dataValues.id
            }
        });
    }
    /**
     * @description gets comment and sorts all comments
     * @returns {obj} comment url and createdAt
     */
    getAndSortAllComments() {
        return Comment.findAll({
            order: [['createdAt', 'DESC']],
            attributes: ['comment', 'url', 'createdAt']
        })
    }
}

module.exports = new IndexService()

