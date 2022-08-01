'use strict';
//bind controllers to routes
module.exports = function (app) {
    var paddyList = require('../controllers/paddyListControllers');
    var riceList = require('../controllers/riceListControllers');
    app.route('/paddy').get(paddyList.list_paddy_items).post(paddyList.create_paddy_item).put(paddyList.change_status).delete(paddyList.delete_item);
    app.route('/rice').get(riceList.list_rice_items).post(riceList.create_rice_item).put(riceList.change_status).delete(riceList.delete_item);
};