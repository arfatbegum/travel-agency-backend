"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const booking_routes_1 = require("../modules/booking/booking.routes");
const category_routes_1 = require("../modules/category/category.routes");
const contact_routes_1 = require("../modules/contact/contact.routes");
const faq_routes_1 = require("../modules/faq/faq.routes");
const feedback_routes_1 = require("../modules/feedback/feedback.routes");
const news_routes_1 = require("../modules/news/news.routes");
const package_routes_1 = require("../modules/package/package.routes");
const review_routes_1 = require("../modules/review/review.routes");
const superAdmin_route_1 = require("../modules/super-admin/superAdmin.route");
const team_routes_1 = require("../modules/team/team.routes");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        routes: auth_route_1.AuthRoutes,
    },
    {
        path: '/user',
        routes: user_route_1.UserRoutes,
    },
    {
        path: '/admin',
        routes: admin_route_1.AdminRoutes,
    },
    {
        path: '/super-admin',
        routes: superAdmin_route_1.SuperAdminRoutes,
    },
    {
        path: '/category',
        routes: category_routes_1.CategoryRoutes,
    },
    {
        path: '/package',
        routes: package_routes_1.PackageRoutes,
    },
    {
        path: '/booking',
        routes: booking_routes_1.BookingRoutes,
    },
    {
        path: '/team',
        routes: team_routes_1.TeamRoutes,
    },
    {
        path: '/contact',
        routes: contact_routes_1.ContactRoutes,
    },
    {
        path: '/review',
        routes: review_routes_1.ReviewRoutes,
    },
    {
        path: '/news',
        routes: news_routes_1.NewsRoutes,
    },
    {
        path: '/faq',
        routes: faq_routes_1.FaqRoutes,
    },
    {
        path: '/feedback',
        routes: feedback_routes_1.FeedbackRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
