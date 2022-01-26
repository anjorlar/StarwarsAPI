const axios = require('axios');
const indexService = require('../services/index')

class IndexController {
    async getMovieName(req, res) {
        try {
            const url = await axios.get('https://swapi.py4e.com/api/films/')

            let result = url.data.results.sort((a, b) => {
                let dateA = new Date(a.release_date);
                let dateB = new Date(b.release_date);
                return dateA - dateB;
            })
            let arr = []
            for (let each of result) {
                let val = {
                    movieName: each.title,
                    opening_crawl: each.opening_crawl,
                    commentCount: await indexService.getCommentCount(each.title)
                }
                arr.push(val)
            }
            return res.status(200).json({
                message: 'SuccessFul',
                data: arr
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server Error'
            })
        }
    }

    async addComment(req, res) {
        try {
            let { titleId, comment } = req.body
            if (!titleId || !comment || comment.trim() === "") {
                return res.status(400).json({
                    message: 'titleId or comment cannot be empty'
                })
            }
            if (comment.length > 500) {
                return res.status(400).json({
                    message: 'comment must be less than 500 words'
                })
            }
            const urlVal = req.get('host')

            let commentObj = {
                comment: comment.trim(),
                url: urlVal,
                titleId,
            }
            const createComment = await indexService.saveComment(commentObj)
            return res.status(200).json({
                message: 'SuccessFul',
                data: createComment
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server Error'
            })
        }
    }

    async retrieveComment(req, res) {
        try {
            let result = await indexService.getAndSortAllComments()
            return res.status(200).json({
                message: 'SuccessFul',
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server Error'
            })
        }
    }

    async getCharacterList(req, res) {
        try {
            const { sort, filter } = req.query
            let { id } = req.params

            id = Number(id)
            const validateId = [1, 2, 3, 4, 5, 6, 7]
            if (validateId.includes(id) !== true) {
                return res.status(400).json({
                    message: 'Invalid Id, id must be a value between 1 and 7'
                })
            }
            id -= 1
            const url = await axios.get('https://swapi.py4e.com/api/films/')

            let newVal = await Promise.all(url.data.results[id]['characters'].map(people => axios.get(people)))
            let mappedData = newVal.map(each => each.data)

            let nameSorting;
            let data;

            if (sort) {
                if (sort.toLowerCase() === 'name') {
                    nameSorting = mappedData.sort((a, b) => {
                        let fa = a.name.toLowerCase(),
                            fb = b.name.toLowerCase();
                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    });
                }

                if (sort.toLowerCase() === 'gender') {
                    nameSorting = mappedData.sort((a, b) => {
                        let fa = a.gender.toLowerCase(),
                            fb = b.gender.toLowerCase();
                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    });
                }
                if (sort.toLowerCase() === 'height') {
                    nameSorting = mappedData.sort((a, b) => {
                        return a.height - b.height;
                    });
                }
            } else {
                nameSorting = mappedData.sort((a, b) => {
                    let fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase();
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
            }
            let filterValidation = ['male', 'female', 'n/a']
            if (filter) {
                if (filterValidation.includes(filter) !== true) {
                    return res.status(400).json({
                        message: `Invalid filter type, filter must be one of male, female, or n/a`
                    })
                }
                data = nameSorting.filter(each => each.gender === filter.toLowerCase())
            }
            let sumHeightInCm = data.reduce(function (accumulator, item) {
                return accumulator + Number(item.height);
            }, 0);
            let totalHeightInFt = `${Math.round(sumHeightInCm * 0.0294) + "ft"}`
            let totalHeightInInches = `${Math.round(sumHeightInCm * 0.039) + "inches"}`

            let totalHeightInCm = `${sumHeightInCm + "cm"}`;
            let finalVal = {
                data,
                totalHeightInCm,
                totalHeightInFt,
                totalHeightInInches,
                count: data.length
            }
            return res.status(200).json({
                message: 'successful',
                finalVal
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server Error'
            })
        }
    }
}

module.exports = new IndexController();