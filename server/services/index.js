const Title = require('../models').Title
const Comment = require('../models').Comment

class IndexService {

    createPost(post) {
        return Title.create(post)
    }

    saveComment(obj) {
        return Comment.create(obj)
    }

    async getCommentCount(title) {
        let val = await Title.findOne({
            where: {
                title
            },
            attributes: ['id']
        })
        console.log('val', val)
        return Comment.count({
            where: {
                titleId: val.dataValues.id
            }
        });
    }

    getAndSortAllComments() {
        return Comment.findAll({
            order: [['createdAt', 'DESC']],
            attributes: ['comment', 'url', 'createdAt']
        })
    }

    getAllPkFromTitleTable() {
        return Title.findAll({
            attributes: ['id']
        })
    }
}

module.exports = new IndexService()

