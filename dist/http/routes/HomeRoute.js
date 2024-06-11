"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
class HomeRoute {
    paginaInicial(req, res) {
        res.json({
            message: 'Welcome',
        });
    }
}
exports.home = new HomeRoute();
